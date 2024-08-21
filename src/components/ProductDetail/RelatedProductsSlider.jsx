import React, { useState, useEffect } from "react";
import product from "../../images/products/product.webp";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { NavLink, useNavigate } from "react-router-dom";
// import { FaShoppingBasket, FaExternalLinkAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { BsHeart } from "react-icons/bs";
import Aos from "aos";
import "aos/dist/aos.css";
import useCart from "../../Hooks/useCart";
import { FaShoppingBasket } from "react-icons/fa";
import useWishlist from "../../Hooks/useWishlist";
import WishlistFill from "../Wishlist/WishlistFill";
import AddToCartBtn from "../Cart/AddToCartBtn";
const RelatedProductsSlider = ({ similarProducts, ref, styles }) => {
  const navigate = useNavigate();
  const [similarProdData, setSimilarProdData] = useState(similarProducts);
  const userId = useSelector((state) => state.user.User_Data.user_id);
  const { addtoCart } = useCart();
  const { addtoWishlist, getWishlistItems, GetWishlistData } = useWishlist();
  const [isAddToWishlist, setIsAddToWishlist] = useState(null);
  const [isaddtoCart, setIsAddToCart] = useState(null);
  const [Refetch, setRefetch] = useState("");

  let wishlistItems = GetWishlistData();

  useEffect(() => {
    getWishlistItems();
  }, []);

  useEffect(() => {
    setSimilarProdData(similarProducts);
  }, [similarProducts]);

  const options = {
    margin: 20,
    responsiveClass: true,
    nav: true,
    dots: false,
    autoplay: false,
    responsive: {
      0: {
        items: 2,
      },
      400: {
        items: 2,
      },
      600: {
        items: 2,
      },
      700: {
        items: 3,
      },
      1000: {
        items: 5,
      },
    },
  };
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
      <div className="related-products py-5">
        <div className="container">
          <h2>Similar products</h2>
          <div className="our-cs-silder mt-4">
            <OwlCarousel className="owl-theme" {...options}>
              {similarProdData?.map((curElem) => (
                <div className="comon-relate-items" key={curElem?.id}>
                  <div className="produc-div">
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

                          setIsAddToWishlist(curElem?.id);
                          let wishlistData = {
                            user_id: userId,
                            id: curElem?.route,
                          };
                          await addtoWishlist(
                            wishlistData,
                            true,
                            setIsAddToWishlist
                          );
                          // getWishlist();
                        }}
                      >
                        {/* <BsHeart /> */}
                        <WishlistFill
                          wishlistItems={wishlistItems}
                          Product_id={curElem?.id}
                        />
                      </div>
                      <figure
                        onClick={() => navigate(`/product/${curElem?.route}`)}
                      >
                        <img
                          src={
                            curElem?.featured_img
                              ? process.env.REACT_APP_IMAGE_BASE_URL +
                                curElem?.featured_img
                              : product
                          }
                          alt="pic"
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
                              {curElem?.price_variation?.[0]?.discount_price !==
                              0
                                ? new Intl.NumberFormat().format(
                                    curElem?.price_variation?.[0]
                                      ?.discount_price
                                  )
                                : curElem?.price_variation?.[0]?.offer_price !==
                                  0
                                ? new Intl.NumberFormat().format(
                                    curElem?.price_variation?.[0]?.offer_price
                                  )
                                : new Intl.NumberFormat().format(
                                    curElem?.price_variation?.[0]?.price
                                  )}
                            </h5>
                            {curElem?.price_variation?.[0]?.discount_price !==
                              0 ||
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
                          <AddToCartBtn
                            isaddtoCart={isaddtoCart}
                            route={curElem?.route}
                            setIsAddToCart={setIsAddToCart}
                          />
                          {/* <button
                            className="btn cart-btn_main"
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
                            disabled={
                              isaddtoCart == curElem?.route ? true : false
                            }
                          >
                            <FaShoppingBasket className="cart_icon" /> Add To
                            Cart
                          </button> */}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          </div>
        </div>
      </div>
    </>
  );
};
export default RelatedProductsSlider;
