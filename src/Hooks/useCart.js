import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  fetchCartData,
  createCartData,
  updateCartData,
  deleteCartData,
  fetchProductDetailData,
} from "../http/apiService";
import useWishlist from "./useWishlist";
import { useState } from "react";

function useCart() {
  const dispatch = useDispatch();
  const { removeFromWishlist } = useWishlist();
  const userId = useSelector((state) => state.user.User_Data.user_id);
  const cartItems = useSelector((state) => state.cart.CartItems);
  const auth_token = useSelector((state) => state.user.User_Data.auth_token);

  const header = {
    headers: {
      Authorization: `Bearer ${auth_token}`,
    },
  };

  //! cart functions
  const getCartItems = async () => {
    try {
      if (!auth_token) {
        return;
      }
      const response = await fetchCartData(userId, header);
      if (response.status == 200 || response.status == 201) {
        if (response.data.status == 404) {
          dispatch({
            type: "GET_CART_ITEM",
            payload: [],
          });
        } else {
          dispatch({
            type: "GET_CART_ITEM",
            payload: response.data.data,
          });
        }
      }
      return response;
    } catch (error) {
      console.error("Error fetching data:", error);
      return error;
    }
  };

  const createCart = async (formData) => {
    try {
      const response = await createCartData(formData, header);
      if (response.status == 200 || response.status == 201) {
        if (response.data.status == 404) {
          toast.warn(response.data.message, {
            autoClose: 800,
            theme: "dark",
            toastId: "CartNotice",
          });
        } else {
          toast.success("Product Added to Cart!", {
            autoClose: 800,
            theme: "dark",
            toastId: "CartNotice",
          });
          getCartItems();
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return error;
    }
  };

  const removeCartItem = async (id) => {
    try {
      const response = await deleteCartData(id, header);
      if (response.status == 200 || response.status == 201) {
        // dispatch({
        //   type: "DELETE_ITEM",
        //   payload: response.data,
        // });
        toast.success("Product Successfully Removed from Cart!", {
          autoClose: 800,
          theme: "dark",
          toastId: "CartNotice",
        });
        getCartItems();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return error;
    }
  };

  function GetCartData() {
    let cartData = cartItems?.cart;
    return cartData;
  }
  function GetCartLength() {
    return cartItems?.cart?.length ? cartItems?.cart?.length : 0;
  }
  function isCart() {
    if (cartItems?.cart?.length || cartItems?.cart?.length > 0) {
      return true;
    } else {
      return false;
    }
  }
  async function addtoCart(formData, is_wish_id, isPageCart, setIsAddToCart) {
    let updatedCartData;
    if (!auth_token) {
      toast.warn("Please Login First!", {
        autoClose: 800,
        theme: "dark",
        toastId: "CartAuthNotice",
      });
    } else {
      if (isPageCart) {
        const { data } = await fetchProductDetailData(formData?.id);
        if (data?.product?.price_variation[0]) {
          if (data?.product?.price_variation[0]?.stock == 0) {
            toast.warn("Can't add to cart, item is out of stock", {
              autoClose: 800,
              theme: "dark",
              toastId: "CartOutofStockNotice",
            });
            setIsAddToCart(null);

            return;
          }
          updatedCartData = await {
            user_id: formData?.user_id,
            product_id: data?.product?.price_variation[0]?.product_id,
            product_variation_id:
              data?.product?.price_variation[0]?.variation_id,
            product_value_id:
              data?.product?.price_variation[0]?.variation_value_id,
            qty: 1,
          };
          createCart(updatedCartData);
          setIsAddToCart(null);
          return;
        }
      }
      createCart(formData);
      if (is_wish_id) {
        let wish_true = true;
        removeFromWishlist(is_wish_id, wish_true);
      }
    }
  }
  //? update cart items quantity
  async function updateCart(cart_id, qty) {
    let cartItems = await getCartItems();
    let cartData = cartItems?.data?.data?.cart?.map((item) => {
      if (item?.cart_id == cart_id) {
        return {
          cart_id: cart_id,
          qty: qty,
        };
      }
      return {
        cart_id: item?.cart_id,
        qty: item?.qty,
      };
    });
    let payload = {
      user_id: userId,
      cart: cartData,
    };
    try {
      const response = await updateCartData(payload, header);
      if (response.status == 200 || response.status == 201) {
        getCartItems();
        // toast.success("Product Quantity Updated!", {
        //   autoClose: 800,
        //   theme: "dark",
        // toastId: "CartNotice",

        // });
      }
      return response;
    } catch (error) {
      toast.error("Oops, Something went wrong!", {
        autoClose: 800,
        theme: "dark",
        toastId: "CartNotice",
      });
      console.error("Error fetching data:", error);
      return error;
    }
  }
  //? update cart items according to stock
  async function updateStockCart(stockData) {
    return;
    const cartItemsList = GetCartData();
    let UpdatedCart = cartItemsList?.filter((item) => {
      // Check if the Active_variation id is in the stock data list
      const stockItem = stockData?.find(
        (stockItem) => stockItem?.id === item?.Active_variation?.id
      );
      // Check if the stockItem exists and its stock is not equal to 0
      return stockItem && parseInt(stockItem.stock) !== 0;
    });
    dispatch({
      type: "UPDATE_STOCK_ITEM",
      payload: UpdatedCart,
    });
  }
  //? remove a single selected items form cart
  async function removeFromCart(id) {
    removeCartItem(id);
  }
  //? clear cart
  function clearCart() {
    getCartItems();
  }

  //? give sub totoal of cart items
  function CartItemsSum() {
    let total = cartItems?.total;
    // return total?.toFixed(2);
    return total;
  }
  return {
    addtoCart,
    getCartItems,
    GetCartData,
    updateCart,
    removeFromCart,
    clearCart,
    GetCartLength,
    CartItemsSum,
    isCart,
    updateStockCart,
  };
}

export default useCart;
