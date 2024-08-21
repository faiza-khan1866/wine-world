import {
  ADD_ITEM,
  GET_CART_ITEM,
  DELETE_ITEM,
  UPDATE_ITEM,
  UPDATE_STOCK_ITEM,
  CLEAR_ITEMS,
  COUPON_CODE,
  BANNER_LOCATION_DATA,
} from "../actionTypes/actionTypes";

const initialState = {
  CartItems: [],
  coupanCodeValue: 0,
  bannerLocation: {},
  shippingCharges: 15,
  Freeshippinglimit: 100,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART_ITEM:
      return {
        ...state,
        CartItems: action.payload,
      };
    case ADD_ITEM:
      return {
        ...state,
        CartItems: action.payload,
      };
    case DELETE_ITEM:
      return {
        ...state,
        CartItems: action.payload,
      };
    case UPDATE_ITEM:
      return {
        ...state,
        CartItems: action.payload,
      };
    case UPDATE_STOCK_ITEM:
      return {
        ...state,
        CartItems: action.payload,
      };
    case CLEAR_ITEMS:
      return {
        ...state,
        CartItems: [],
        coupanCodeValue: 0,
      };
    case COUPON_CODE:
      return {
        ...state,
        coupanCodeValue: action.payload,
      };
    case BANNER_LOCATION_DATA:
      return {
        ...state,
        bannerLocation: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
