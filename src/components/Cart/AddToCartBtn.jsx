import React from "react";
import useCart from "../../Hooks/useCart";
import { FaShoppingBasket } from "react-icons/fa";
import { useSelector } from "react-redux";

function AddToCartBtn(props) {
  const { addtoCart } = useCart();
  const userId = useSelector((state) => state.user.User_Data.user_id);

  return (
    <>
      <button
        className={`btn ${
          props.cartCls ? "cart-btn_main_bestSelling" : "cart-btn_main"
        } cart-btn_main_Comp borderRadius_1`}
        onClick={() => {
          if (!props.isaddtoCart == null) {
            return;
          }
          let cartData = {
            user_id: userId,
            id: props?.route,
          };
          props?.setIsAddToCart(props?.route);
          addtoCart(cartData, false, true, props?.setIsAddToCart);
        }}
        disabled={props?.isaddtoCart == props?.route ? true : false}
      >
        <FaShoppingBasket className="cart_icon" />
        &nbsp; Add To Cart
      </button>
    </>
  );
}

export default AddToCartBtn;
