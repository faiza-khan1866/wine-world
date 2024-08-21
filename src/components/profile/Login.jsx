import React, { useState } from "react";
import logo from "../../images/logo/logo.png";
import { toast } from "react-toastify";
import { Modal, Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { userLogin } from "../../http/apiService";
import {
  forgetPasswordPopUp,
  logIn,
  registerPopUp,
} from "../../appRedux/actions/userAction";
import { useNavigate, useLocation } from "react-router-dom";
import SocialLoginComponent from "./SocialLoginComponent";
import appStore from "../../images/icons/app-store.jpg";
import googleStore from "../../images/icons/google-play.jpg";
import qrCode from "../../images/bgimages/qr.png";

const Login = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  let initial = {
    email: "",
    password: "",
    // user_type: "user",
  };
  const [UserData, setUserrData] = useState({ ...initial });
  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    let UpdateUserData = { ...UserData };
    UpdateUserData[e.target.name] = e.target.value;
    setUserrData(UpdateUserData);
    // Clear error message when user starts typing again
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const { email, password } = UserData;
    const errors = {};
    if (!email) {
      errors.email = "Please Enter Email Address.";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = "Invalid Email Address.";
    }
    if (!password) {
      errors.password = "Please Enter Password.";
    } else if (password.length < 8) {
      errors.password = "Password Should be 8 Character Long.";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setIsLoading(false);
      return;
    }

    try {
      const response = await userLogin(UserData);
      setIsLoading(false);
      if (response.data.error) {
        setErrors({ submit: response.data.error });
        return;
      }
      if (response?.data?.success) {
        toast.success(response.data.success, {
          autoClose: 3000,
          theme: "dark",
        });
      }
      dispatch(
        logIn({
          auth_token: response?.headers?.x_auth_token,
          user_id: response?.data?.user?.id,
          user_type: response?.data?.user?.user_type,
        })
      );
      if (location?.pathname == "/cart" || location?.pathname == "/checkout") {
        props.onHide();
      } else {
        navigate("/account");
        props.onHide();
      }
    } catch (error) {
      setIsLoading(false);
      setErrors({ submit: "Oops!, something went wrong try again later!" });
    }
  };

  return (
    <>
      <Modal
        {...props}
        backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="profile_modal"
      >
        <Modal.Body className="profile_pop_up_wrape">
          {props?.show ? (
            <Container>
              <Row>
                <Col sm={6} className="profile_bg_img">
                  <div className="DownloadWrapper">
                    <div className="d-flex flex-column align-items-start align-items-md-center justify-content-md-center">
                      <a
                        href="https://apps.apple.com/app/royalspirit/id6475167410"
                        target="_blank"
                        rel="nofollow"
                      >
                        <img
                          src={appStore}
                          className="img-fluid d-block  LoginStoreLogo"
                          loading="lazy"
                          alt="appStore"
                        />
                      </a>
                      <a
                        href="https://play.google.com/store/apps/details?id=com.prismDigital.royalsprit"
                        target="_blank"
                        rel="nofollow"
                      >
                        <img
                          src={googleStore}
                          className="img-fluid mt-2 d-block LoginStoreLogo"
                          loading="lazy"
                          alt="googleStore"
                        />
                      </a>
                    </div>
                  </div>
                  <div className="QrWrapper">
                    <div className="QrContainer">
                      <img
                        src={qrCode}
                        className="img-fluid d-block qrLogoImage"
                        loading="lazy"
                        alt="qrCode"
                      />
                    </div>
                  </div>
                </Col>
                <Col sm={12} lg={6}>
                  <div className="profile_content">
                    <p className="text-end p-1 m-0">
                      <MdClose
                        fontSize="24px"
                        className="closeIcon"
                        onClick={props.onHide}
                      />
                    </p>
                    <div className="text-center">
                      <img
                        src={logo}
                        alt="logo"
                        className="img-fluid rounded"
                      />
                    </div>
                    <Form>
                      <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={UserData.email}
                          onChange={handleInput}
                        />
                        <p className="mt-1 text-danger form_error_msg">
                          {errors?.email}
                        </p>
                      </Form.Group>
                      <Form.Group
                        className="mb-4"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password*</Form.Label>
                        <InputGroup>
                          <Form.Control
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={UserData.password}
                            onChange={handleInput}
                            style={{ borderRight: "0" }}
                          />
                          <InputGroup.Text>
                            {showPassword ? (
                              <AiOutlineEye
                                fontSize="20px"
                                onClick={togglePasswordVisibility}
                              />
                            ) : (
                              <AiOutlineEyeInvisible
                                fontSize="20px"
                                onClick={togglePasswordVisibility}
                              />
                            )}
                          </InputGroup.Text>
                        </InputGroup>
                        <p className="mt-1 text-danger form_error_msg">
                          {errors?.password} {errors?.submit}
                        </p>
                      </Form.Group>
                      <p
                        className="forget_pass"
                        onClick={() => {
                          dispatch(forgetPasswordPopUp(true));
                          props.onHide();
                        }}
                      >
                        Forgot password?
                      </p>
                      <button
                        type="button"
                        className="btn btn_style2"
                        onClick={() => handleSubmit()}
                        disabled={isLoading ? true : false}
                      >
                        {isLoading ? "Logging..." : "Login"}
                      </button>
                      <p className="pop_up_breaker">Or</p>
                      <button
                        type="button"
                        className="btn btn_style1"
                        onClick={() => {
                          dispatch(registerPopUp(true));
                          props.onHide();
                        }}
                      >
                        Create New Account
                      </button>
                      <p className="pop_up_breaker">Or</p>
                      <SocialLoginComponent
                        lg={12}
                        hideLoginPopUp={props?.onHide}
                      />
                    </Form>
                  </div>
                </Col>
              </Row>
            </Container>
          ) : null}
        </Modal.Body>
      </Modal>
    </>
  );
};
export default Login;
