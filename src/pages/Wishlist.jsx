import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import SubpageBanner from "../components/common/SubpageBanner";
import WishlistBody from "../components/Wishlist/WishlistBody";
import bannerImg from "../images/banners/New_images/wishlist.jpg";
import bannerImgMbl from "../images/banners/New_images/wishlistMbl.jpg";

const Wishlist = () => {
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
        <title>Wishlist | Royal Spirit</title>
        <meta name="description" content="Wishlist" />
      </Helmet>
      <SubpageBanner
        name="Wishlist"
        indexpage="Home"
        indexvisit="/"
        activepage="Wishlist"
        bgImg={bannerImg}
        bgImgMbl={bannerImgMbl}
      />
      <WishlistBody />
    </>
  );
};
export default Wishlist;
