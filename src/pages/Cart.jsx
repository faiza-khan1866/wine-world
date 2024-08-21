import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import SubpageBanner from "../components/common/SubpageBanner";
import CartBody from "../components/Cart/CartBody";
import bannerImg from "../images/banners/cartbanner.png";

const Cart = () => {
  const navigate = useNavigate();
  const isUserLogIn = useSelector((state) => state.user.isUser);

  useEffect(() => {
    if (!isUserLogIn) {
      navigate("/");
      toast.warn("Please Login First.", {
        autoClose: 3000,
        theme: "dark",
        toastId: "loginMsg",
      });
    }
  }, [isUserLogIn, navigate]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Cart | Royal Spirit</title>
        <meta name="description" content="Cart" />
      </Helmet>
      {/* <SubpageBanner
        name="Cart"
        indexpage="Home"
        indexvisit="/"
        activepage="Cart"
        bgImg={bannerImg}
      /> */}
      <div className="Mgt" style={{ background: "black" }}></div>

      <CartBody indexpage="Home" indexvisit="/" activepage="Cart" />
    </>
  );
};
export default Cart;
