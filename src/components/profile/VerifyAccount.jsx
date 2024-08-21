import React, { useEffect, useState } from "react";
import { auth } from "../../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import Aos from "aos";
import "aos/dist/aos.css";
import logo from "../../images/logo/logo.png";
import otpImg from "../../images/bgimages/verifybgimg.png";
import { Modal, Container, Row, Col, Form } from "react-bootstrap";
import { MdClose } from "react-icons/md";
import { registerUserData, verifyUserOtp } from "../../http/apiService";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import Register from "./Register";
import OtpTImer from "../common/OtpTImer";
import {
  verifyAccountPopUp,
  logIn,
  registerPopUp,
} from "../../appRedux/actions/userAction";
import { useNavigate, useLocation } from "react-router-dom";

const VerifyAccount = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const IsEmailVerify = useSelector((state) => state.user.isEmailVerify);
  const UserData = useSelector((state) => state.user.User_Verification);

  const verifyAccountPopUpShow = useSelector(
    (state) => state?.user?.verifyAccountPopUpShow
  );

  const [isClicked, setIsClicked] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("email");
  const [showRegisterModalVar, setShowRegisterModalVar] = useState(false);
  const [OTPValue, setOTPValue] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [codeReSent, setCodeReSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [OtpFailed, setOtpFailed] = useState(false);
  const [OtpTimerCompleted, setOTPTimerComplete] = useState(false);
  let otpTimer = {
    secs: 59,
    mints: 9,
  };
  const [seconds, setSeconds] = useState(otpTimer?.secs);
  const [minutes, setMinutes] = useState(otpTimer.mints);
  const [Reset, setReset] = useState(false);

  useEffect(() => {
    Aos.init({
      offset: 100,
      easing: "ease",
      delay: 0,
      once: true,
      duration: 800,
    });
  });

  // firebase auth otp
  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            // onSignUp();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  function onSignUp() {
    let UserPhone = UserData?.mobile
      .replace(/\s+/g, "")
      .replace(/-/g, "")
      .replace(/[()]/g, "");

    setIsLoading(true);
    onCaptchVerify();
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, UserPhone, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setOtpFailed(false);
        toast.success("OTP Sent on Phone!", {
          autoClose: 3000,
          theme: "dark",
        });
        setIsLoading(false);
        setCodeSent(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }
  function OnOtPVerify(OtpCode) {
    setIsLoading(true);
    let confirmationResult = window.confirmationResult;
    if (confirmationResult) {
      confirmationResult
        .confirm(OtpCode)
        .then(async (result) => {
          const user = result.user;
          let UpdatedData = { ...UserData };
          UpdatedData.email_verification = false;
          const response = await registerUserData(UpdatedData);
          if (response.status == 200 || response.status == 201) {
            if (response?.data?.error) {
              setIsLoading(false);
              setCodeSent(false);
              setOTPValue("");
              toast.error(response?.data?.error, {
                autoClose: 3000,
                theme: "dark",
              });
            } else if (response?.data?.errors) {
              setIsLoading(false);
              setCodeSent(false);
              setOTPValue("");
              toast.error(response?.data?.errors?.mobile[0], {
                autoClose: 3000,
                theme: "dark",
              });
            } else {
              setIsLoading(false);
              setCodeSent(true);
              setOTPValue("");
              toast.success("OTP Verified, You Have Successfully Logged In!", {
                autoClose: 3000,
                theme: "dark",
              });
              dispatch({
                type: "CLEAR_VERIFY_USER",
              });
              dispatch(
                logIn({
                  auth_token: response?.headers?.x_auth_token,
                  user_id: response?.data?.user?.id,
                  user_type: response?.data?.user?.user_type,
                })
              );
              if (
                location?.pathname == "/cart" ||
                location?.pathname == "/checkout"
              ) {
                dispatch(verifyAccountPopUp(false));
              } else {
                navigate("/account");
                dispatch(verifyAccountPopUp(false));
              }
              return result;
            }
          }
        })
        .catch((error) => {
          setIsLoading(false);
          setOtpFailed(true);
          setOTPValue("");
          toast.error("OTP Verification Error, Please try again!", {
            autoClose: 3000,
            theme: "dark",
          });
        });
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true);
    setIsClicked(true);
    if (!selectedMethod) {
      toast.warn("Please Select a Verification Method!", {
        autoClose: 3000,
        theme: "dark",
      });
      setIsLoading(false);
      setIsClicked(false);
      return;
    }
    // let UpdatedData = { ...UserData };
    try {
      if (selectedMethod == "email") {
        // setting verification to email
        let UpdatedData = { ...UserData };
        UpdatedData.email_verification = true;
        const response = await registerUserData(UpdatedData);
        if (response.status == 200 || response.status == 201) {
          if (response?.data?.error) {
            setIsLoading(false);
            setOTPValue("");
            setCodeSent(false);

            toast.error(response?.data?.error, {
              autoClose: 3000,
              theme: "dark",
            });
          } else if (response?.data?.errors) {
            setIsLoading(false);
            setOTPValue("");
            setCodeSent(false);

            toast.error(response?.data?.errors?.email[0], {
              autoClose: 3000,
              theme: "dark",
            });
          } else {
            setIsLoading(false);
            setCodeSent(true);
            setOtpFailed(false);
            toast.success("OTP Sent on Email!", {
              autoClose: 3000,
              theme: "dark",
            });
          }
        }
      } else if (selectedMethod == "phone") {
        // setting verification for phone

        await onSignUp();
      }
    } catch (error) {
      console.log(error);
      toast.error("Oops, Something went wrong!", {
        autoClose: 3000,
        theme: "dark",
      });
      setIsLoading(false);
      setCodeSent(false);
    }
  };
  const handleOTPSubmit = async () => {
    if (!OTPValue || OTPValue == "") {
      toast.warn("Please Enter, Correct OTP!", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }
    try {
      if (selectedMethod == "email") {
        // setting verification to email
        setIsLoading(true);

        let OptData = {
          // email_verification: true,
          code: OTPValue,
        };
        const response = await verifyUserOtp(OptData);
        if (response.status == 200 || response.status == 201) {
          setIsLoading(false);
          setCodeSent(true);
          toast.success("OTP Verified, You Have Successfully Logged In!", {
            autoClose: 3000,
            theme: "dark",
          });
          dispatch({
            type: "CLEAR_VERIFY_USER",
          });
          dispatch(
            logIn({
              auth_token: response?.headers?.x_auth_token,
              user_id: response?.data?.user?.id,
              user_type: response?.data?.user?.user_type,
            })
          );
          if (
            location?.pathname == "/cart" ||
            location?.pathname == "/checkout"
          ) {
            dispatch(verifyAccountPopUp(false));
          } else {
            navigate("/account");
            dispatch(verifyAccountPopUp(false));
          }
        }
      } else if (selectedMethod == "phone") {
        // setting verification for phone
        let Response = await OnOtPVerify(OTPValue);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Oops, Something went wrong please try again later!", {
        autoClose: 3000,
        theme: "dark",
      });
    }
  };
  const handleOTPReSendSubmit = async () => {
    if (isLoading) {
      return;
    }
    if (!OtpTimerCompleted) {
      toast.warn("Please wait at least 10 mint before Resending OTP!", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }
    setSeconds(otpTimer?.secs);
    setMinutes(otpTimer.mints);
    setReset(true);
    setCodeReSent(true);
    handleSubmit();
  };

  return (
    <>
      <Modal
        show={verifyAccountPopUpShow}
        onHide={() => dispatch(verifyAccountPopUp(false))}
        backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="profile_modal"
      >
        <Modal.Body className="profile_pop_up_wrape">
          {verifyAccountPopUpShow ? (
            <Container>
              <Row>
                <Col>
                  <Register
                    show={showRegisterModalVar}
                    onHide={() => {
                      setShowRegisterModalVar(false);
                      dispatch(registerPopUp(false));
                    }}
                    isEdit={true}
                  />
                </Col>
              </Row>
              <Row>
                <Col
                  sm={6}
                  className="profile_bg_img"
                  style={{ background: `url(${otpImg})` }}
                ></Col>
                <Col sm={6}>
                  <div className="profile_content">
                    <button
                      className="btn btn_style1 Back_btn"
                      type="button"
                      onClick={() => {
                        dispatch(registerPopUp(true));
                        setShowRegisterModalVar(true);
                        setCodeSent(false);
                      }}
                    >
                      <BsFillArrowLeftCircleFill />
                    </button>
                    <p className="text-end p-1 m-0">
                      <MdClose
                        fontSize="24px"
                        className="closeIcon"
                        onClick={() => dispatch(verifyAccountPopUp(false))}
                      />
                    </p>
                    <div className="text-center">
                      <img
                        src={logo}
                        alt="logo"
                        className="img-fluid rounded"
                      />
                    </div>
                    {!codeSent ? (
                      <Form>
                        <Form.Group className="mb-4">
                          <Form.Label>
                            Select an option to verify your account
                          </Form.Label>
                          <Form.Check
                            type="radio"
                            id="email"
                            name="Verify_Method"
                            label={`Email Verification (${UserData?.email})`}
                            onClick={(e) => setSelectedMethod(e.target.id)}
                            defaultChecked={
                              selectedMethod == "email" ? true : false
                            }
                          />
                        </Form.Group>
                        <Form.Group className="mb-4">
                          <Form.Check
                            type="radio"
                            id="phone"
                            name="Verify_Method"
                            defaultChecked={
                              selectedMethod == "phone" ? true : false
                            }
                            label={`Mobile Verification (${UserData?.mobile}) `}
                            onClick={(e) => setSelectedMethod(e.target.id)}
                          />
                        </Form.Group>
                        <button
                          className="btn btn_style1"
                          type="button"
                          onClick={() => {
                            handleSubmit();
                          }}
                          disabled={isLoading ? true : false}
                        >
                          {isLoading ? "Sending..." : "Get OTP"}
                        </button>
                      </Form>
                    ) : (
                      <Form>
                        <Form.Group
                          className="mb-3 mt-4"
                          controlId="formBasicEmail"
                        >
                          <Form.Label>Enter Your Verification Code*</Form.Label>
                          <Form.Control
                            type="number"
                            name="otp"
                            value={OTPValue}
                            onChange={(e) => setOTPValue(e.target.value)}
                          />
                          <OtpTImer
                            secs={seconds}
                            mins={minutes}
                            setOTPTimerComplete={setOTPTimerComplete}
                            onResend={handleOTPReSendSubmit}
                            Reset={Reset}
                            setReset={setReset}
                          />
                        </Form.Group>
                        <button
                          className="btn btn_style1 mb-2"
                          type="button"
                          onClick={() => {
                            handleOTPSubmit();
                          }}
                          disabled={isLoading ? true : false}
                        >
                          {isLoading && !codeReSent
                            ? "Sending..."
                            : "Submit OTP"}
                        </button>
                        {OtpFailed && (
                          <button
                            className="btn btn_style1 otpTimer"
                            type="button"
                            onClick={() => {
                              handleOTPReSendSubmit();
                            }}
                          >
                            Resend OTP
                          </button>
                        )}
                      </Form>
                    )}
                  </div>
                </Col>
                <Col>
                  <div id="recaptcha-container"></div>
                </Col>
              </Row>
            </Container>
          ) : null}
        </Modal.Body>
      </Modal>
    </>
  );
};
export default VerifyAccount;
