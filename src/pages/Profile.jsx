import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Aos from "aos";
import "aos/dist/aos.css";
import SubpageBanner from "../components/common/SubpageBanner";
import ProfileArea from "../components/Account/ProfileArea";
import bannerImg from "../images/banners/accountbanner.png";

const Profile = () => {
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
        <title>My Profile | Royal Spirit</title>
        <meta name="description" content="My Profile" />
      </Helmet>
      <SubpageBanner
        name="My Profile"
        indexpage="Home"
        indexvisit="/"
        activepage="My Profile"
        bgImg={bannerImg}
      />
      <ProfileArea />
    </>
  );
};
export default Profile;
