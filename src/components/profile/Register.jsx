import React, { useState } from "react";
import logo from "../../images/logo/logo.png";
import { Modal, Container, Row, Col } from "react-bootstrap";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { registerPopUp } from "../../appRedux/actions/userAction";
import UserRegisterForm from "./UserRegisterForm";
import CorporateRegisterForm from "./CorporateRegisterForm";
import appStore from "../../images/icons/app-store.jpg";
import googleStore from "../../images/icons/google-play.jpg";
import qrCode from "../../images/bgimages/qr.png";
const Register = ({ isEdit }) => {
  const registerPopUpShow = useSelector(
    (state) => state?.user?.registerPopUpShow
  );
  const dispatch = useDispatch();
  const [userType, setUserType] = useState("user");

  return (
    <>
      <Modal
        show={registerPopUpShow}
        onHide={() => dispatch(registerPopUp(false))}
        backdrop="static"
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="profile_modal"
      >
        <Modal.Body className="profile_pop_up_wrape">
          {registerPopUpShow ? (
            <Container>
              <Row>
                <Col sm={5} className="profile_bg_img">
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
                {/* <Col sm={1}></Col> */}
                <Col sm={7}>
                  <div className="profile_content">
                    <p className="text-end p-1 m-0">
                      <MdClose
                        fontSize="24px"
                        className="closeIcon"
                        onClick={() => dispatch(registerPopUp(false))}
                      />
                    </p>
                    <div className="text-center">
                      <img
                        src={logo}
                        alt="logo"
                        className="img-fluid rounded"
                      />
                    </div>
                    {userType == "user" ? (
                      <UserRegisterForm
                        setUserType={setUserType}
                        userType={userType}
                        isEdit={isEdit}
                      />
                    ) : (
                      <CorporateRegisterForm
                        setUserType={setUserType}
                        userType={userType}
                        isEdit={isEdit}
                      />
                    )}
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
export default Register;
