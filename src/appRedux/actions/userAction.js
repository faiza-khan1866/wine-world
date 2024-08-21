import {
  VERIFY_USER,
  CLEAR_VERIFY_USER,
  LOG_IN,
  LOG_OUT,
  SHOW_AGE_POPUP,
  AGE_POPUP_VALUE,
  USER_INFO,
  SHOW_LOGIN_POPUP,
  SHOW_REGISTER_POPUP,
  SHOW_FORGET_PASSWORD_POPUP,
  SHOW_VERIFY_ACCOUNT_POPUP,
  GOOGLE_LOG_IN,
  FACEBOOK_LOGIN,
} from "../actionTypes/actionTypes";

const VerifyUser = (payload) => {
  return {
    type: VERIFY_USER,
    payload: payload,
  };
};
const VerifyClear = () => {
  return {
    type: CLEAR_VERIFY_USER,
  };
};
const logIn = (payload) => {
  return {
    type: LOG_IN,
    payload: payload,
  };
};
const googleLogIn = (payload) => {
  return {
    type: GOOGLE_LOG_IN,
    payload: payload,
  };
};
const facebookLogIn = (payload) => {
  return {
    type: FACEBOOK_LOGIN,
    payload: payload,
  };
};
const logOut = () => {
  return {
    type: LOG_OUT,
  };
};
const userInfo = (payload) => {
  return {
    type: USER_INFO,
    payload: payload,
  };
};
const agePopUp = (payload) => {
  return {
    type: SHOW_AGE_POPUP,
    payload: payload,
  };
};
const agePopUpValue = (payload) => {
  return {
    type: AGE_POPUP_VALUE,
    payload: payload,
  };
};
const loginPopUp = (payload) => {
  return {
    type: SHOW_LOGIN_POPUP,
    payload: payload,
  };
};
const registerPopUp = (payload) => {
  return {
    type: SHOW_REGISTER_POPUP,
    payload: payload,
  };
};
const forgetPasswordPopUp = (payload) => {
  return {
    type: SHOW_FORGET_PASSWORD_POPUP,
    payload: payload,
  };
};
const verifyAccountPopUp = (payload) => {
  return {
    type: SHOW_VERIFY_ACCOUNT_POPUP,
    payload: payload,
  };
};
export {
  VerifyUser,
  VerifyClear,
  logIn,
  logOut,
  agePopUp,
  agePopUpValue,
  userInfo,
  loginPopUp,
  registerPopUp,
  forgetPasswordPopUp,
  verifyAccountPopUp,
  googleLogIn,
  facebookLogIn,
};
