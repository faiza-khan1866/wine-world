import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import WishlistLeft from "./WishlistLeft";
import { BsHeart } from "react-icons/bs";
import useWishlist from "../../Hooks/useWishlist";

const WishlistBody = () => {
  const { isWishlist } = useWishlist();
  const isWish = isWishlist();

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
      {isWish ? (
        <div className="cart-body-sec my-5">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <WishlistLeft />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty_cart text-center py-5">
          <BsHeart className="empty_cat_icon" />
          <h2 className="m-0">Your wishlist is currently empty.!</h2>
        </div>
      )}
    </>
  );
};

export default WishlistBody;
