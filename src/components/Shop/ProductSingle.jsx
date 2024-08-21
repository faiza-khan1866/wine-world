import React, { memo, useEffect, useState } from "react";
import { FaShoppingBasket } from "react-icons/fa";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import useWishlist from "../../Hooks/useWishlist";
import AddToCartBtn from "../Cart/AddToCartBtn";
import { BsHeart } from "react-icons/bs";
import product from "../../images/products/product.webp";
import WishlistFill from "../Wishlist/WishlistFill";
import { useSelector } from "react-redux";
function ProductSingle({
  curElem,
  wishlistItems,
  isAddToWishlist,
  setIsAddToWishlist,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const { addtoWishlist, getWishlistItems } = useWishlist();

  const searchParams = new URLSearchParams(location?.search);
  const search = searchParams?.get("search");
  const price = searchParams?.get("price");
  const origin = searchParams?.get("origin");
  const userId = useSelector((state) => state.user.User_Data.user_id);

  const [isaddtoCart, setIsAddToCart] = useState(null);

  return (
    <div className="produc-div" key={`${curElem?.id}prds`}>
      <div className="products-box">
        {curElem?.price_variation?.[0]?.discount_price ||
        curElem?.price_variation?.[0]?.offer_price ? (
          <div className="offer-text-div">
            {(
              ((curElem?.price_variation?.[0]?.price -
                (curElem?.price_variation?.[0]?.discount_price ||
                  curElem?.price_variation?.[0]?.offer_price)) /
                curElem?.price_variation?.[0]?.price) *
              100
            ).toFixed(2)}{" "}
            %
          </div>
        ) : null}
        <div
          className="wish_prod_icon"
          onClick={async () => {
            if (!isAddToWishlist == null) {
              return;
            }

            setIsAddToWishlist(curElem?.route);
            let wishlistData = {
              user_id: userId,
              id: curElem?.route,
            };
            await addtoWishlist(wishlistData, true, setIsAddToWishlist);
            // getWishlistItems();
          }}
        >
          {/* <BsHeart />
           */}
          <WishlistFill
            wishlistItems={wishlistItems}
            Product_id={curElem?.id}
          />
        </div>
        <figure
          onClick={() => navigate(`/product/${curElem?.route}`)}
          className="d-flex justify-content-center align-items-center"
        >
          <img
            src={
              curElem?.featured_img
                ? process.env.REACT_APP_IMAGE_BASE_URL + curElem?.featured_img
                : product
            }
            alt="pic"
            style={{
              height: "180px",
              objectFit: "contain",
            }}
          />
        </figure>
        {/* <div
  className="hover-show-bn"
  onClick={() =>
    navigate(
      `/product/${curElem?.category?.route}/${curElem?.route}`
    )
  }
>
  <NavLink
    to={`/product/${curElem?.category?.route}/${curElem?.route}`}
    className="comon-hv-bn"
  >
    <FaExternalLinkAlt />
  </NavLink>
</div> */}
      </div>

      <div className="ps-details text-center">
        {/* <p className="cate-text d-table text-center m-auto">
  {curElem?.category?.name}
</p> */}
        <p className="brand-tite d-table text-center m-auto">
          {curElem?.brands?.name}
        </p>
        <NavLink
          to={`/product/${curElem?.route}`}
          className="products-titel m-auto"
          dangerouslySetInnerHTML={{ __html: curElem?.name }}
        ></NavLink>
        {curElem?.price_variation?.length > 0 && (
          <>
            <div className="d-flex align-items-center justify-content-center gap-1">
              <h5 className="price-text">
                AED{" "}
                {curElem?.price_variation?.[0]?.discount_price !== 0
                  ? new Intl.NumberFormat().format(
                      curElem?.price_variation?.[0]?.discount_price
                    )
                  : curElem?.price_variation?.[0]?.offer_price !== 0
                  ? new Intl.NumberFormat().format(
                      curElem?.price_variation?.[0]?.offer_price
                    )
                  : new Intl.NumberFormat().format(
                      curElem?.price_variation?.[0]?.price
                    )}
              </h5>
              {curElem?.price_variation?.[0]?.discount_price !== 0 ||
              curElem?.price_variation?.[0]?.offer_price !== 0 ? (
                <h5 className="old-pice text-decoration-line-through">
                  AED{" "}
                  {new Intl.NumberFormat().format(
                    curElem?.price_variation?.[0]?.price
                  )}
                </h5>
              ) : (
                ""
              )}
            </div>
            {curElem?.price_variation?.[0]?.stock == "0" ? (
              <p
                className="cate-text d-table text-center m-auto pt-1"
                style={{ fontSize: "14px" }}
              >
                <span className="text-danger">Out Of Stock</span>
              </p>
            ) : (
              <AddToCartBtn
                isaddtoCart={isaddtoCart}
                route={curElem?.route}
                setIsAddToCart={setIsAddToCart}
              />
            )}

            {/* <button
      className="btn cart-btn_main borderRadius_1"
      onClick={() => {
        if (!isaddtoCart == null) {
          return;
        }
        let cartData = {
          user_id: userId,
          id: curElem?.route,
        };
        setIsAddToCart(curElem?.route);
        addtoCart(cartData, false, true, setIsAddToCart);
      }}
      disabled={isaddtoCart == curElem?.route ? true : false}
    >
      <FaShoppingBasket className="cart_icon" /> Add To Cart
    </button> */}
          </>
        )}
      </div>
    </div>
  );
}

export default memo(ProductSingle);
