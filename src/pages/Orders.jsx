import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Aos from "aos";
import "aos/dist/aos.css";
import SubpageBanner from "../components/common/SubpageBanner";
import OrdersList from "../components/Account/OrdersList";
import bannerImg from "../images/banners/ordersbanner.png";

const Orders = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
      <Helmet>
        <title>Orders History | Royal Spirit</title>
        <meta name="description" content="Orders History" />
      </Helmet>
      <SubpageBanner
        name="Orders History"
        indexpage="Home"
        indexvisit="/"
        activepage="Orders History"
        bgImg={bannerImg}
      />
      <OrdersList />
    </>
  );
};
export default Orders;
