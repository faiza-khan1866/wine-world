import {
  VERIFY_USER,
  CLEAR_VERIFY_USER,
  LOG_OUT,
  LOG_IN,
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

const initialState = {
  isEmailVerify: false,
  User_Verification: {},
  isUser: false,
  User_Data: {},
  agePopUpShow: true,
  loginPopUpShow: false,
  forgetPasswordPopUpShow: false,
  registerPopUpShow: false,
  verifyAccountPopUpShow: false,
  User_Details: {},
  isValidAge: false,
  googleUserData: {},
  facebookUserData: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case VERIFY_USER:
      return {
        ...state,
        isEmailVerify: true,
        User_Verification: structuredClone(action.payload),
      };
    case CLEAR_VERIFY_USER:
      return {
        ...state,
        isEmailVerify: false,
        User_Verification: {},
      };
    case LOG_IN:
      return {
        ...state,
        isUser: true,
        User_Data: structuredClone(action.payload),
      };
    case GOOGLE_LOG_IN:
      return {
        ...state,
        isUser: true,
        googleUserData: structuredClone(action.payload),
      };
    case FACEBOOK_LOGIN:
      return {
        ...state,
        isUser: true,
        facebookUserData: structuredClone(action.payload),
      };
    case LOG_OUT:
      return {
        ...state,
        isUser: false,
        User_Data: {},
        User_Details: {},
        isValidAge: false,
        googleUserData: {},
        facebookUserData: {},
      };
    case USER_INFO:
      return {
        ...state,
        User_Details: structuredClone(action.payload),
      };
    case SHOW_AGE_POPUP:
      return {
        ...state,
        agePopUpShow: action.payload,
      };
    case AGE_POPUP_VALUE:
      return {
        ...state,
        isValidAge: action.payload,
      };
    case SHOW_LOGIN_POPUP:
      return {
        ...state,
        loginPopUpShow: action.payload,
      };
    case SHOW_FORGET_PASSWORD_POPUP:
      return {
        ...state,
        forgetPasswordPopUpShow: action.payload,
      };
    case SHOW_REGISTER_POPUP:
      return {
        ...state,
        registerPopUpShow: action.payload,
      };
    case SHOW_VERIFY_ACCOUNT_POPUP:
      return {
        ...state,
        verifyAccountPopUpShow: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
