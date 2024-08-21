import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import SubpageBanner from "../components/common/SubpageBanner";
import CheckoutBody from "../components/Checkout/CheckoutBody";
import BestsellingHome from "../components/Home/BestsellingHome";
import bannerImg from "../images/banners/checkoutbanner.png";

const Checkout = () => {
  const navigate = useNavigate();
  const isUserLogIn = useSelector((state) => state.user.isUser);
  const userId = useSelector((state) => state.user.User_Data.user_id);
  const auth_token = useSelector((state) => state.user.User_Data.auth_token);

  useEffect(() => {
    if (!isUserLogIn) {
      navigate("/");
      toast.warn("Please Login First to Checkout.", {
        autoClose: 3000,
        theme: "dark",
        toastId: "loginMsg",
      });
    }
  }, [isUserLogIn]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Helmet>
        <title>Checkout | Royal Spirit</title>
        <meta name="description" content="Checkout" />
      </Helmet>
      {/* <SubpageBanner
        name="Check Out"
        indexpage="Home"
        indexvisit="/"
        activepage="Check Out"
        bgImg={bannerImg}
      /> */}
      <div className="Mgt" style={{ background: "black" }}></div>

      <CheckoutBody
        userId={userId}
        authToken={auth_token}
        indexpage="Home"
        indexvisit="/"
        activepage="Check Out"
      />
      <div className="">
        <BestsellingHome />
      </div>
    </>
  );
};
export default Checkout;
