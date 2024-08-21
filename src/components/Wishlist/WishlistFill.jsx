import React, { useEffect } from "react";
import { BsHeart } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";

function WishlistFill(props) {
  return (
    <>
      {props.wishlistItems?.find((item) => item?.id == props?.Product_id) ? (
        <FaHeart color="red" />
      ) : (
        <BsHeart />
      )}
    </>
  );
}

export default WishlistFill;
