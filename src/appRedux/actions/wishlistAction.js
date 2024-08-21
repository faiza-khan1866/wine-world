import {
  GET_WISHLIST_ITEM,
  DELETE_WISHLIST_ITEM,
  CLEAR_WISHLIST,
} from "../actionTypes/actionTypes";

const getWishlistItem = () => {
  return {
    type: GET_WISHLIST_ITEM,
  };
};

const deleteWishlistItem = () => {
  return {
    type: DELETE_WISHLIST_ITEM,
  };
};

const clearWishlist = () => {
  return {
    type: CLEAR_WISHLIST,
  };
};

export { getWishlistItem, deleteWishlistItem, clearWishlist };
