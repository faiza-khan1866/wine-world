import React, { useState } from "react";
import logo from "../../images/logo/logo.png";
import { Modal } from "react-bootstrap";
import {
  agePopUp,
  loginPopUp,
  registerPopUp,
  agePopUpValue,
} from "../../appRedux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";

const AgePopUp = () => {
  const dispatch = useDispatch();
  const agePopUpShow = useSelector((state) => state?.user?.agePopUpShow);
  const isValidAge = useSelector((state) => state?.user?.isValidAge);
  const [hideButtons, setHideButtons] = useState(false);

  const onHandleClick = () => {
    setHideButtons(true);
  };

  return (
    <>
      <Modal
        show={agePopUpShow}
        // onHide={() => dispatch(agePopUp(false))}
        backdrop="static"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="age_modal"
      >
        <Modal.Body className="age_pop_up_wrape">
          <img
            src={logo}
            alt="logo"
            className="img-fluid rounded"
            height={80}
            width={88}
          />
          <p>You must be of legal drinking age to buy our products. </p>
          <h3>
            Are you <span>21</span>+ Years of Age?
          </h3>
          <div className="mb-4">
            {isValidAge == false && hideButtons == false && (
              <>
                <button
                  type="button"
                  className="btn btn_style1"
                  onClick={() => {
                    dispatch(agePopUpValue(true));
                  }}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className="btn btn_style2"
                  onClick={() => {
                    dispatch(agePopUpValue(false));
                    onHandleClick();
                  }}
                >
                  No
                </button>
              </>
            )}
            {isValidAge == false && hideButtons == true && (
              <p>
                You are not old enough to view this content 😒. See you next
                year?
              </p>
            )}
          </div>
          <div>
            <button
              type="button"
              className="btn btn_style1"
              onClick={() => {
                dispatch(registerPopUp(true));
                dispatch(agePopUp(false));
              }}
              disabled={isValidAge == true ? false : true}
            >
              Register Now
            </button>

            <button
              type="button"
              className="btn btn_style3"
              onClick={() => {
                dispatch(loginPopUp(true));
                dispatch(agePopUp(false));
              }}
              disabled={isValidAge == true ? false : true}
            >
              Sign In
            </button>
          </div>
          <p className="pop_up_breaker">Or</p>
          <button
            type="button"
            className="btn btn_style4"
            onClick={() => dispatch(agePopUp(false))}
            disabled={isValidAge == true ? false : true}
          >
            Continue As guest
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default AgePopUp;
