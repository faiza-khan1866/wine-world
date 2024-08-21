import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import CartLeft from "./CartLeft";
import OrderTotal from "./OrderTotal";
import { useSelector } from "react-redux";
import { BsCart3 } from "react-icons/bs";
import useCart from "../../Hooks/useCart";
import { NavLink } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";

const CartBody = ({ indexvisit, indexpage, activepage }) => {
  const { isCart } = useCart();
  const cartItems = useSelector((state) => state.cart.CartItems);

  const userId = useSelector((state) => state.user.User_Data.user_id);
  const isUserLogIn = useSelector((state) => state.user.isUser);

  useEffect(() => {
    Aos.init({
      offset: 100,
      easing: "ease",
      delay: 0,
      once: true,
      duration: 800,
    });
  });
  return (
    <>
      {cartItems?.cart?.length ? (
        <div className="cart-body-sec my-5">
          <div className="container">
            <div className="page-breakcrumb">
              <ul className="list-unstyled d-flex justify-content-start align-items-start">
                <li>
                  <NavLink to={indexvisit}> {indexpage} </NavLink>
                </li>
                <li>
                  <FaAngleRight />
                </li>
                <li
                  className="active"
                  dangerouslySetInnerHTML={{ __html: activepage }}
                />
              </ul>
            </div>
            <div className="row gx-lg-5">
              <div className="col-md-8 col-lg-8">
                <CartLeft />
              </div>
              <div className="col-md-4 col-lg-4">
                <OrderTotal userId={userId} isUserLogIn={isUserLogIn} />
                {/* <DeliveryDate /> */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty_cart text-center py-5">
          <BsCart3 className="empty_cat_icon" />
          <h2 className="m-0">Your cart is currently empty.!</h2>
        </div>
      )}
    </>
  );
};

export default CartBody;
