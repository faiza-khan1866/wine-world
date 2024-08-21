import React, { useState } from "react";
import logo from "../../images/logo/logo.png";
import otpImg from "../../images/bgimages/verifybgimg.png";
import { Modal, Container, Row, Col, Form } from "react-bootstrap";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";
import { forgetPassword } from "../../http/apiService";
import { forgetPasswordPopUp } from "../../appRedux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";

const ForgetPassword = (props) => {
  const dispatch = useDispatch();
  const forgetPasswordPopUpShow = useSelector(
    (state) => state?.user?.forgetPasswordPopUpShow
  );
  const [UserEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    if (!UserEmail || UserEmail == "") {
      toast.warn("Please Enter your Email Address.", {
        autoClose: 3000,
        theme: "dark",
      });
      setIsLoading(false);
      return;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(UserEmail)) {
      toast.warn("Please Enter Valid Email Address.", {
        autoClose: 3000,
        theme: "dark",
      });
      setIsLoading(false);

      return;
    }

    try {
      let formdata = {
        email: UserEmail,
      };
      const response = await forgetPassword(formdata);
      if (response.status == 200 || response.status == 201) {
        toast.success("Reset Password link sent to email Address.", {
          autoClose: 3000,
          theme: "dark",
        });
        dispatch(forgetPasswordPopUp(false));
      }
    } catch (error) {
      toast.error("Selected Email is Invalid.", {
        autoClose: 3000,
        theme: "dark",
      });
    }
    setIsLoading(false);
  };
  return (
    <>
      <Modal
        show={forgetPasswordPopUpShow}
        onHide={() => dispatch(forgetPasswordPopUp(false))}
        backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="profile_modal"
      >
        <Modal.Body className="profile_pop_up_wrape">
          {forgetPasswordPopUpShow ? (
            <Container>
              <Row>
                <Col
                  sm={6}
                  className="profile_bg_img"
                  style={{ background: `url(${otpImg})` }}
                ></Col>
                <Col sm={6}>
                  <div className="profile_content">
                    <p className="text-end p-1 m-0">
                      <MdClose
                        fontSize="24px"
                        className="closeIcon"
                        onClick={() => dispatch(forgetPasswordPopUp(false))}
                      />
                    </p>
                    <div className="text-center">
                      <img
                        src={logo}
                        alt="logo"
                        className="img-fluid rounded"
                      />
                    </div>
                    <p className="forget_pass_title">
                      Lost Your Password? Please Enter Your Email Address. You
                      Will Receive A Link To Create A New Password Via Email.
                    </p>
                    <Form>
                      <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Label>
                          Enter Your Recovery Email Address*
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          onChange={(e) => setUserEmail(e.target.value)}
                          required
                        />
                      </Form.Group>
                      <button
                        className="btn btn_style1"
                        type="button"
                        onClick={() => handleSubmit()}
                        disabled={isLoading ? true : false}
                      >
                        {isLoading ? "Sending Link" : "Reset Password"}
                      </button>
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
export default ForgetPassword;
