import React, { useState, useEffect, useRef } from "react";
import { QueryCache } from "react-query";
import product from "../../images/products/product.webp";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Aos from "aos";
import { useFetchBestSellingProductsData } from "../../http/apiService";
import useCart from "../../Hooks/useCart";
import useWishlist from "../../Hooks/useWishlist";
import WishlistFill from "../Wishlist/WishlistFill";
import AddToCartBtn from "../Cart/AddToCartBtn";
import Slider from "react-slick";
import { slice } from "lodash";

export const BestsellingHome = (props) => {
  const navigate = useNavigate();
  let sliderRef = useRef(null);
  const queryCache = new QueryCache();
  let DefaultIndexCount = 6;
  const userId = useSelector((state) => state.user.User_Data.user_id);
  const { addtoCart } = useCart();
  const { addtoWishlist } = useWishlist();

  const [isaddtoCart, setIsAddToCart] = useState(null);
  const [isAddToWishlist, setIsAddToWishlist] = useState(null);

  const { data: bestSellingData, isLoading } =
    useFetchBestSellingProductsData(queryCache);
  const bestSellingProductsList =
    bestSellingData?.data?.best_selling?.filter(
      (product) => product?.products?.price_variation?.length > 0
    ) || [];
  const [isCompleted, setIsCompleted] = useState(false);
  const [index, setIndex] = useState(DefaultIndexCount);
  const initialBestSelling = slice(bestSellingProductsList, 0, index);

  const loadMore = () => {
    setIndex(index + 6);
    if (index >= bestSellingProductsList.length) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  };
  const loadMoreMbl = () => {
    setIndex(index + 6);
    sliderRef?.slickGoTo(bestSellingProductsList?.length);
    if (index >= bestSellingProductsList.length) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  };
  // const [bestSellingProductsList, setBestSellingProductsList] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  //   const fetchHomeBestSellingProductsData = async () => {
  //     try {
  //       setIsLoading(true); // Show the loader
  //       const { data } = await fetchBestSellingProductsData();
  //       setBestSellingProductsList(
  //         data?.best_selling?.filter(
  //           (product) => product?.products?.price_variation?.length > 0
  //         )
  //       );
  //     } catch (error) {
  //       console.error("Error fetching Data:", error);
  //     } finally {
  //       setIsLoading(false); // Hide the loader
  //     }
  //   };
  //   fetchHomeBestSellingProductsData();
  // }, []);
  useEffect(() => {
    Aos.init({
      offset: 100,
      easing: "ease",
      delay: 0,
      once: true,
      duration: 800,
    });
    setIndex(DefaultIndexCount);
    setIsCompleted(false);
  }, []);

  const settings = {
    dots: false,
    arrows: false,
    autoplay: true,
    infinite: false,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    speed: 1500,
    margin: 30,
    slidesToShow: 6,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  return (
    <>
      <div className="Prodcuts-div mt-5 py-5">
        <div className="container">
          {/* <h6 className="text-center" data-aos="fade-down">
               Own production
            </h6> */}
          <h2
            className="text-center text-white comon-heading"
            data-aos="fade-up"
          >
            Best-Selling
          </h2>
          <div className="products-slide">
            <div className="filter-container">
              {isLoading ? (
                <SkeletonTheme baseColor="#00000029" highlightColor="#00000029">
                  <div className="row g-md-5 mt-5 gy-2 gy-lg-0 DeskTOpVIew">
                    {[1, 2, 3, 4, 5, 6]?.map((x, i) => (
                      <div
                        className="col col-md-4 col-lg-2 p-1"
                        data-aos="fade-down"
                        key={i}
                      >
                        <Skeleton height={290} />
                        <Skeleton count={3} />
                      </div>
                    ))}
                  </div>
                  <div className="row g-md-5 mt-5 row-cols-1 row-cols-md-2 row-cols-lg-4 gy-2 gy-lg-0 mobileVIew">
                    <Slider {...settings}>
                      {[1, 2, 3, 4, 5, 6]?.map((x, i) => (
                        <div className="col" data-aos="fade-down" key={i}>
                          <Skeleton height={290} />
                          <Skeleton count={3} />
                        </div>
                      ))}
                    </Slider>
                  </div>
                </SkeletonTheme>
              ) : (
                <>
                  <div className="row g-md-5 mt-5 gy-2 gy-lg-0 DeskTOpVIew">
                    {initialBestSelling?.map((curElem) => (
                      <div
                        className="col col-md-4 col-lg-2 p-0"
                        data-aos="fade-down"
                        key={curElem?.products?.id}
                      >
                        <div className="produc-div border1">
                          <div className="products-box">
                            {curElem?.products?.price_variation?.[0]
                              ?.discount_price ||
                            curElem?.products?.price_variation?.[0]
                              ?.offer_price ? (
                              <div className="offer-text-div">
                                {(
                                  ((curElem?.products?.price_variation?.[0]
                                    ?.price -
                                    (curElem?.products?.price_variation?.[0]
                                      ?.discount_price ||
                                      curElem?.products?.price_variation?.[0]
                                        ?.offer_price)) /
                                    curElem?.products?.price_variation?.[0]
                                      ?.price) *
                                  100
                                ).toFixed(2)}{" "}
                                %
                              </div>
                            ) : null}
                            <div
                              className="wish_prod_icon text-white"
                              onClick={() => {
                                if (!isAddToWishlist == null) {
                                  return;
                                }

                                setIsAddToWishlist(curElem?.products?.route);
                                let wishlistData = {
                                  user_id: userId,
                                  id: curElem?.products?.route,
                                };
                                addtoWishlist(
                                  wishlistData,
                                  true,
                                  setIsAddToWishlist
                                );
                                props?.setRefetch(curElem?.products?.route);
                              }}
                            >
                              {/* <BsHeart /> */}
                              <WishlistFill
                                wishlistItems={props?.wishlistItems}
                                Product_id={curElem?.products?.id}
                              />
                            </div>
                            <figure
                              onClick={() =>
                                navigate(`/product/${curElem?.products?.route}`)
                              }
                            >
                              <img
                                src={
                                  curElem?.products?.featured_img
                                    ? process.env.REACT_APP_IMAGE_BASE_URL +
                                      curElem?.products?.featured_img
                                    : product
                                }
                                alt="pic"
                                loading="lazy"
                                width={202}
                                height={290}
                              />
                            </figure>
                            {/* <div
                            className="hover-show-bn"
                            onClick={() =>
                              navigate(
                                `/product/${curElem?.products?.category?.route}/${curElem?.products?.route}`
                              )
                            }
                          >
                            <NavLink
                              to={`/product/${curElem?.products?.category?.route}/${curElem?.products?.route}`}
                              className="comon-hv-bn"
                            >
                              <FaExternalLinkAlt />
                            </NavLink>
                          </div> */}
                          </div>

                          <div className="ps-details text-center">
                            {/* <p className="cate-text d-table text-center m-auto">
                            {curElem?.products?.category?.name}
                          </p> */}
                            <NavLink
                              to={`/product/${curElem?.products?.route}`}
                              className="products-titel m-auto"
                              dangerouslySetInnerHTML={{
                                __html: curElem?.products?.name,
                              }}
                            ></NavLink>
                            {curElem?.products?.price_variation?.length > 0 && (
                              <>
                                <div className="d-flex align-items-center justify-content-center gap-1">
                                  <h5 className="price-text">
                                    AED{" "}
                                    {curElem?.products?.price_variation?.[0]
                                      ?.discount_price !== 0
                                      ? new Intl.NumberFormat().format(
                                          curElem?.products
                                            ?.price_variation?.[0]
                                            ?.discount_price
                                        )
                                      : curElem?.products?.price_variation?.[0]
                                          ?.offer_price !== 0
                                      ? new Intl.NumberFormat().format(
                                          curElem?.products
                                            ?.price_variation?.[0]?.offer_price
                                        )
                                      : new Intl.NumberFormat().format(
                                          curElem?.products
                                            ?.price_variation?.[0]?.price
                                        )}
                                  </h5>
                                  {curElem?.products?.price_variation?.[0]
                                    ?.discount_price !== 0 ||
                                  curElem?.products?.price_variation?.[0]
                                    ?.offer_price !== 0 ? (
                                    <h5 className="old-pice text-decoration-line-through">
                                      AED{" "}
                                      {new Intl.NumberFormat().format(
                                        curElem?.products?.price_variation?.[0]
                                          ?.price
                                      )}
                                    </h5>
                                  ) : (
                                    ""
                                  )}
                                </div>
                                <AddToCartBtn
                                  isaddtoCart={isaddtoCart}
                                  route={curElem?.products?.route}
                                  setIsAddToCart={setIsAddToCart}
                                  cartCls={"cart-btn_main_bestS"}
                                />
                                {/* <button
                                    className="btn cart-btn_main"
                                    onClick={() => {
                                      if (!isaddtoCart == null) {
                                        return;
                                      }
                                      let cartData = {
                                        user_id: userId,
                                        id: curElem?.products?.route,
                                      };
                                      setIsAddToCart(curElem?.products?.route);
                                      addtoCart(
                                        cartData,
                                        false,
                                        true,
                                        setIsAddToCart
                                      );
                                    }}
                                    disabled={
                                      isaddtoCart == curElem?.products?.route
                                        ? true
                                        : false
                                    }
                                  >
                                    <FaShoppingBasket className="cart_icon" /> Add
                                    To Cart
                                  </button> */}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="row DeskTOpVIew">
                    <div className="col">
                      {isCompleted ? (
                        <div className="text-center">
                          <button
                            disabled
                            className="btn ViewMOreBtn ViewMOreBtnDone borderRadius_1"
                          >
                            No More Products Show
                          </button>
                        </div>
                      ) : (
                        <>
                          {initialBestSelling?.length <= 0 ? null : (
                            <div className="text-center">
                              <button
                                onClick={loadMore}
                                type="button"
                                className="btn ViewMOreBtn borderRadius_1"
                              >
                                View More
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  <div className="row g-md-5 mt-5 row-cols-1 row-cols-md-2 row-cols-lg-4 gy-2 gy-lg-0 mobileVIew">
                    <Slider
                      {...settings}
                      ref={(slider) => {
                        sliderRef = slider;
                      }}
                    >
                      {initialBestSelling?.map((curElem) => (
                        <div
                          className="col "
                          data-aos="fade-down"
                          key={curElem?.products?.id}
                        >
                          <div className="produc-div border1">
                            <div className="products-box">
                              {curElem?.products?.price_variation?.[0]
                                ?.discount_price ||
                              curElem?.products?.price_variation?.[0]
                                ?.offer_price ? (
                                <div className="offer-text-div">
                                  {(
                                    ((curElem?.products?.price_variation?.[0]
                                      ?.price -
                                      (curElem?.products?.price_variation?.[0]
                                        ?.discount_price ||
                                        curElem?.products?.price_variation?.[0]
                                          ?.offer_price)) /
                                      curElem?.products?.price_variation?.[0]
                                        ?.price) *
                                    100
                                  ).toFixed(2)}{" "}
                                  %
                                </div>
                              ) : null}
                              <div
                                className="wish_prod_icon text-white"
                                onClick={() => {
                                  if (!isAddToWishlist == null) {
                                    return;
                                  }

                                  setIsAddToWishlist(curElem?.products?.route);
                                  let wishlistData = {
                                    user_id: userId,
                                    id: curElem?.products?.route,
                                  };
                                  addtoWishlist(
                                    wishlistData,
                                    true,
                                    setIsAddToWishlist
                                  );
                                  props?.setRefetch(curElem?.products?.route);
                                }}
                              >
                                {/* <BsHeart /> */}
                                <WishlistFill
                                  wishlistItems={props?.wishlistItems}
                                  Product_id={curElem?.products?.id}
                                />
                              </div>
                              <figure
                                onClick={() =>
                                  navigate(
                                    `/product/${curElem?.products?.route}`
                                  )
                                }
                              >
                                <img
                                  src={
                                    curElem?.products?.featured_img
                                      ? process.env.REACT_APP_IMAGE_BASE_URL +
                                        curElem?.products?.featured_img
                                      : product
                                  }
                                  alt="pic"
                                  loading="lazy"
                                  width={126}
                                  height={290}
                                />
                              </figure>
                              {/* <div
                          className="hover-show-bn"
                          onClick={() =>
                            navigate(
                              `/product/${curElem?.products?.category?.route}/${curElem?.products?.route}`
                            )
                          }
                        >
                          <NavLink
                            to={`/product/${curElem?.products?.category?.route}/${curElem?.products?.route}`}
                            className="comon-hv-bn"
                          >
                            <FaExternalLinkAlt />
                          </NavLink>
                        </div> */}
                            </div>

                            <div className="ps-details text-center">
                              {/* <p className="cate-text d-table text-center m-auto">
                          {curElem?.products?.category?.name}
                        </p> */}
                              <NavLink
                                to={`/product/${curElem?.products?.route}`}
                                className="products-titel m-auto"
                                dangerouslySetInnerHTML={{
                                  __html: curElem?.products?.name,
                                }}
                              ></NavLink>
                              {curElem?.products?.price_variation?.length >
                                0 && (
                                <>
                                  <div className="d-flex align-items-center justify-content-center gap-1">
                                    <h5 className="price-text">
                                      AED{" "}
                                      {curElem?.products?.price_variation?.[0]
                                        ?.discount_price !== 0
                                        ? new Intl.NumberFormat().format(
                                            curElem?.products
                                              ?.price_variation?.[0]
                                              ?.discount_price
                                          )
                                        : curElem?.products
                                            ?.price_variation?.[0]
                                            ?.offer_price !== 0
                                        ? new Intl.NumberFormat().format(
                                            curElem?.products
                                              ?.price_variation?.[0]
                                              ?.offer_price
                                          )
                                        : new Intl.NumberFormat().format(
                                            curElem?.products
                                              ?.price_variation?.[0]?.price
                                          )}
                                    </h5>
                                    {curElem?.products?.price_variation?.[0]
                                      ?.discount_price !== 0 ||
                                    curElem?.products?.price_variation?.[0]
                                      ?.offer_price !== 0 ? (
                                      <h5 className="old-pice text-decoration-line-through">
                                        AED{" "}
                                        {new Intl.NumberFormat().format(
                                          curElem?.products
                                            ?.price_variation?.[0]?.price
                                        )}
                                      </h5>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                  <AddToCartBtn
                                    isaddtoCart={isaddtoCart}
                                    route={curElem?.products?.route}
                                    setIsAddToCart={setIsAddToCart}
                                    cartCls={"cart-btn_main_bestS"}
                                  />
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </Slider>
                  </div>
                  <div className="row mobileVIew">
                    <div className="col">
                      {isCompleted ? (
                        <div className="text-center">
                          <button
                            disabled
                            className="btn ViewMOreBtn ViewMOreBtnDone borderRadius_1"
                          >
                            No More Products Show
                          </button>
                        </div>
                      ) : (
                        <>
                          {initialBestSelling?.length <= 0 ? null : (
                            <div className="text-center">
                              <button
                                onClick={loadMoreMbl}
                                type="button"
                                className="btn ViewMOreBtn borderRadius_1"
                              >
                                View More
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
