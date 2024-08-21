import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Aos from "aos";
import "aos/dist/aos.css";
import SubpageBanner from "../components/common/SubpageBanner";
import Dashboard from "../components/Account/Dashboard";
import bannerImg from "../images/banners/New_images/account.jpg";
import bannerImgMbl from "../images/banners/New_images/accountMbl.jpg";

const Account = () => {
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
        <title>Account | Royal Spirit</title>
        <meta name="description" content="Account" />
      </Helmet>
      <SubpageBanner
        name="Account"
        indexpage="Home"
        indexvisit="/"
        activepage="Account"
        bgImg={bannerImg}
        bgImgMbl={bannerImgMbl}
      />
      <Dashboard />
    </>
  );
};
export default Account;
