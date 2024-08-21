import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  fetchWishlistData,
  createWishlistData,
  deleteWishlistData,
  clearWishlistData,
  fetchProductDetailData,
} from "../http/apiService";

function useWishlist() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.WishlistItems);
  const userId = useSelector((state) => state.user.User_Data.user_id);
  const auth_token = useSelector((state) => state.user.User_Data.auth_token);

  const header = {
    headers: {
      Authorization: `Bearer ${auth_token}`,
    },
  };

  //! wishlist functions
  const getWishlistItems = async () => {
    try {
      if (!auth_token) {
        return { data: [] };
      }
      const response = await fetchWishlistData(userId, header);
      if (response.status == 200 || response.status == 201) {
        dispatch({
          type: "GET_WISHLIST_ITEM",
          payload: response.data,
        });
      }
      return response;
    } catch (error) {
      console.error("Error fetching data:", error);
      return error;
    }
  };

  const createWishlist = async (formData) => {
    try {
      const response = await createWishlistData(formData, header);
      if (response.status == 200 || response.status == 201) {
        if (response.data.status == 404) {
          toast.warn(response.data.message, {
            autoClose: 3000,
            theme: "dark",
          });
        } else {
          toast.success("Product Added to Wishlist!", {
            autoClose: 3000,
            theme: "dark",
          });
          getWishlistItems();
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return error;
    }
  };

  const removeWishListItem = async (id, wish_true) => {
    try {
      const response = await deleteWishlistData(id, header);
      if (response.status == 200 || response.status == 201) {
        // dispatch({
        //   type: "DELETE_WISHLIST_ITEM",
        //   payload: response.data,
        // });
        if (!wish_true) {
          toast.success("Product Successfully Removed from Wishlist!", {
            autoClose: 3000,
            theme: "dark",
          });
        }
        getWishlistItems();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return error;
    }
  };

  const clearWishListItem = async () => {
    try {
      const response = await clearWishlistData(userId, header);
      if (response.status == 200 || response.status == 201) {
        dispatch({
          type: "CLEAR_WISHLIST",
        });
        toast.success("Wishlist Clear Successfully!", {
          autoClose: 3000,
          theme: "dark",
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return error;
    }
  };

  function GetWishlistData() {
    let wishlistData = wishlistItems;
    if (!auth_token) {
      return [];
    }
    return wishlistData;
  }
  function GetWishlistLength() {
    return wishlistItems?.length;
  }
  function isWishlist() {
    if (wishlistItems.length || wishlistItems.length > 0) {
      return true;
    } else {
      return false;
    }
  }
  async function addtoWishlist(formData, isPageWishlist, setIsAddToWishlist) {
    let wishlistData;
    if (!auth_token) {
      toast.warn("Please Login First!", {
        autoClose: 3000,
        theme: "dark",
      });
    } else {
      if (isPageWishlist) {
        const { data } = await fetchProductDetailData(formData?.id);

        if (data?.product?.price_variation[0]) {
          wishlistData = await {
            user_id: formData?.user_id,
            product_id: data?.product?.price_variation[0]?.product_id,
            product_variation_id:
              data?.product?.price_variation[0]?.variation_id,
            product_value_id:
              data?.product?.price_variation[0]?.variation_value_id,
          };
          await createWishlist(wishlistData);
          setIsAddToWishlist(null);
          return;
        }
      }
      createWishlist(formData);
    }
  }

  //? remove a single selected items form wishlist
  async function removeFromWishlist(id, wish_true) {
    removeWishListItem(id, wish_true);
  }
  //? clear wishlist
  function clearWishlist() {
    clearWishListItem();
  }
  return {
    addtoWishlist,
    getWishlistItems,
    createWishlist,
    GetWishlistData,
    removeFromWishlist,
    clearWishlist,
    GetWishlistLength,
    isWishlist,
  };
}

export default useWishlist;
