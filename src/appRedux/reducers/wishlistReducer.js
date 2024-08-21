import {
  GET_WISHLIST_ITEM,
  DELETE_WISHLIST_ITEM,
  CLEAR_WISHLIST,
} from "../actionTypes/actionTypes";

const initialState = {
  WishlistItems: [],
};

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WISHLIST_ITEM:
      return {
        ...state,
        WishlistItems: action.payload,
      };
    case DELETE_WISHLIST_ITEM:
      return {
        ...state,
        WishlistItems: action.payload,
      };
    case CLEAR_WISHLIST:
      return {
        ...state,
        WishlistItems: [],
      };
    default:
      return state;
  }
};

export default wishlistReducer;
