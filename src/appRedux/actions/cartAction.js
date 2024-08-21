import {
  ADD_ITEM,
  GET_CART_ITEM,
  DELETE_ITEM,
  COUPON_CODE,
  BANNER_LOCATION_DATA,
} from "../actionTypes/actionTypes";

const getItem = () => {
  return {
    type: GET_CART_ITEM,
  };
};

const addItem = () => {
  return {
    type: ADD_ITEM,
  };
};

const deleteItem = () => {
  return {
    type: DELETE_ITEM,
  };
};

const couponCodeValue = (payload) => {
  return {
    type: COUPON_CODE,
    payload: payload,
  };
};

const homeBannerLocationData = (payload) => {
  return {
    type: BANNER_LOCATION_DATA,
    payload: payload,
  };
};

export {
  getItem,
  addItem,
  deleteItem,
  couponCodeValue,
  homeBannerLocationData,
};
