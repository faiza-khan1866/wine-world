import React, { useState, useEffect, memo } from "react";
import product from "../../images/products/product.webp";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
// import { FaShoppingBasket, FaExternalLinkAlt } from "react-icons/fa";
// import { BsHeart } from "react-icons/bs";
import Aos from "aos";
import {
  fetchFeaturedProductsData,
  createFeaturedProductsFilterData,
} from "../../http/apiService";
// import useCart from "../../Hooks/useCart";
// import { FaHeart, FaShoppingBasket } from "react-icons/fa";
import useWishlist from "../../Hooks/useWishlist";
import WishlistFill from "../Wishlist/WishlistFill";
import AddToCartBtn from "../Cart/AddToCartBtn";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const FeaturedProdcuts = (props) => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.User_Data.user_id);

  const [categoriesList, setCategoriesList] = useState([]);
  // const { addtoCart } = useCart();
  const { addtoWishlist } = useWishlist();

  const [originalitems, setOriginalitems] = useState([]);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isaddtoCart, setIsAddToCart] = useState(null);
  const [isAddToWishlist, setIsAddToWishlist] = useState(null);

  // const featuredFilter = async (cat) => {
  //   let formData = {
  //     category_id: cat,
  //   };
  //   try {
  //     setIsLoading(true); // Show the loader

  //     const { data } = await createFeaturedProductsFilterData(formData);
  //     let Response = [...data];

  //     let updatedData = Response?.filter(
  //       (product) => product?.featured_products?.price_variation?.length > 0
  //     ).map((item) => item?.featured_products);

  //     setItems(structuredClone(updatedData));
  //   } catch (error) {
  //     console.error("Error fetching Data:", error);
  //   } finally {
  //     setIsLoading(false); // Hide the loader
  //   }
  // };

  const featuredCategoryFilter = (categoryRoute, id) => {
    setActiveCategory(categoryRoute);
    setIsLoading(true);
    // featuredFilter(categoryRoute);
    if (id == "all") {
      setItems(originalitems);
      setIsLoading(false);
    } else {
      const updatedCateogry = originalitems?.filter(
        (item) => item?.category_id == id
      );
      setItems(updatedCateogry);
      setIsLoading(false);
    }
  };
  const fetchHomeFeaturedProductsData = async () => {
    try {
      setIsLoading(true); // Show the loader
      const { data } = await fetchFeaturedProductsData();
      let updatedData = data?.featured_products?.filter(
        (product) => product?.price_variation?.length > 0
      );
      setItems(structuredClone(updatedData));
      setOriginalitems(structuredClone(updatedData));
      setCategoriesList(data?.category_drop_down);
    } catch (error) {
      console.error("Error fetching Data:", error);
    } finally {
      setIsLoading(false); // Hide the loader
    }
  };

  useEffect(() => {
    fetchHomeFeaturedProductsData();
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

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div className={`nextArrow`} onClick={onClick}>
        <FaArrowRight />
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div className={`prevArrow`} onClick={onClick}>
        <FaArrowLeft />
      </div>
    );
  }

  const settings = {
    dots: false,
    arrows: true,
    autoplay: true,
    infinite: false,
    autoplaySpeed: 3500,
    speed: 1500,
    margin: 30,
    slidesToShow: 6,
    slidesToScroll: 3,
    initialSlide: 0,
    pauseOnSlide: true,
    pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
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
          speed: 500,
          // swipeToSlide: true,
          autoplay: false,
          infinite: false,
        },
      },
    ],
  };
  return (
    <>
      <div className="our-production-div pt-5">
        <div className="container">
          <h2 className="text-center" data-aos="fade-down">
            Top shelf picks
          </h2>
          <ul className="fiter-btn list-unstyled filter-menu-q d-flex justify-content-center  flex-wrap pt-1 ">
            <li className="mt-2">
              <button
                type="button"
                className={`btn comon-filter-bn ${
                  activeCategory === "all" ? "active" : ""
                }`}
                onClick={() => featuredCategoryFilter("all", "all")}
              >
                All
              </button>
            </li>
            {categoriesList
              ?.sort((a, b) => {
                if (a.route == "others") return 1;
                if (b.route == "others") return -1;
                return a?.title?.localeCompare(b?.title);
              })
              ?.map((x) => (
                <li key={`catK-${x?.id}`} className="mt-2">
                  <button
                    type="button"
                    className={`btn comon-filter-bn ${
                      activeCategory === x?.route ? "active" : ""
                    }`}
                    onClick={() => featuredCategoryFilter(x?.route, x?.id)}
                  >
                    {x?.name}
                  </button>
                </li>
              ))}
          </ul>

          {isLoading ? (
            <SkeletonTheme baseColor="#fff" highlightColor="#fff">
              <div className="row gy-5 gy-lg-0 g-md-5 mt-0 g-lg-3 DeskTOpVIew">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]?.map((x, i) => (
                  <div
                    className="col-6 col-md-6 col-lg-2 "
                    data-aos="fade-up"
                    key={i}
                  >
                    <Skeleton height={290} />
                    <Skeleton count={3} />
                  </div>
                ))}
              </div>
              <div className="row gy-5 gy-lg-0 g-md-5 mt-0 row-cols-1 row-cols-md-2 row-cols-lg-4 g-lg-5 mobileVIew">
                <Slider {...settings}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]?.map((x, i) => (
                    <div className="col" data-aos="fade-up" key={i}>
                      <Skeleton height={290} />
                      <Skeleton count={3} />
                    </div>
                  ))}
                </Slider>
              </div>
            </SkeletonTheme>
          ) : items?.length == 0 ? (
            <p className="text-center mt-5">
              Product not available at the moment...
            </p>
          ) : (
            <>
              <div className="row gy-5 gy-lg-0 g-md-5 mt-0 g-lg-3 DeskTOpVIew">
                {items?.slice(0, 12)?.map((curElem) => (
                  <div
                    className="col-6 col-md-6 col-lg-2 "
                    key={`pds-${curElem?.id}`}
                  >
                    <div className="produc-div border1">
                      <div className="products-box">
                        {curElem?.price_variation?.[0]?.discount_price ||
                        curElem?.price_variation?.[0]?.offer_price ? (
                          <div className="offer-text-div">
                            {(
                              ((curElem?.price_variation?.[0]?.price -
                                (curElem?.price_variation?.[0]
                                  ?.discount_price ||
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
                            await addtoWishlist(
                              wishlistData,
                              true,
                              setIsAddToWishlist
                            );
                            props?.setrefetchWishlist(curElem?.route);
                            // window.location.reload();
                          }}
                        >
                          <WishlistFill
                            wishlistItems={props?.wishlistItems}
                            Product_id={curElem?.id}
                          />
                          {/* {props.wishlistItems?.find(
                          (item) => item?.id == curElem?.id
                        ) ? (
                          <FaHeart color="red" />
                        ) : (
                          <BsHeart />
                        )} */}
                        </div>
                        <figure
                          fetchpriority="low"
                          loading="lazy"
                          onClick={() => navigate(`/product/${curElem?.route}`)}
                          className="d-flex justify-content-center align-items-center"
                        >
                          <img
                            fetchpriority="low"
                            src={
                              curElem?.featured_img
                                ? process.env.REACT_APP_IMAGE_BASE_URL +
                                  curElem?.featured_img
                                : product
                            }
                            alt="pic"
                            loading="lazy"
                            width={182}
                            height={290}
                            style={{
                              height: "220px",
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
                        <NavLink
                          to={`/product/${curElem?.route}`}
                          className="products-titel m-auto"
                          dangerouslySetInnerHTML={{ __html: curElem?.name }}
                        ></NavLink>
                        {curElem?.price_variation?.length > 0 && (
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
                        )}
                        {curElem?.price_variation?.[0]?.stock == "0" ? (
                          <p
                            className="cate-text d-table text-center m-auto pt-1"
                            style={{ fontSize: "14px", fontWeight: "600" }}
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
                        disabled={isaddtoCart == curElem?.route ? true : false}
                      >
                        <FaShoppingBasket className="cart_icon" /> Add To Cart
                      </button> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="row gy-5 gy-lg-0 g-md-5 mt-0 row-cols-1 row-cols-md-2 row-cols-lg-4 g-lg-5 mobileVIew miblSlickederarrow">
                <Slider {...settings}>
                  {items?.slice(0, 12)?.map((curElem) => (
                    <div className="col" key={`tprl-${curElem?.id}`}>
                      <div className="produc-div">
                        <div className="products-box">
                          {curElem?.price_variation?.[0]?.discount_price ||
                          curElem?.price_variation?.[0]?.offer_price ? (
                            <div className="offer-text-div">
                              {(
                                ((curElem?.price_variation?.[0]?.price -
                                  (curElem?.price_variation?.[0]
                                    ?.discount_price ||
                                    curElem?.price_variation?.[0]
                                      ?.offer_price)) /
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
                              await addtoWishlist(
                                wishlistData,
                                true,
                                setIsAddToWishlist
                              );
                              props?.setrefetchWishlist(curElem?.route);
                              // window.location.reload();
                            }}
                          >
                            <WishlistFill
                              wishlistItems={props?.wishlistItems}
                              Product_id={curElem?.id}
                            />
                            {/* {props.wishlistItems?.find(
                          (item) => item?.id == curElem?.id
                        ) ? (
                          <FaHeart color="red" />
                        ) : (
                          <BsHeart />
                        )} */}
                          </div>
                          <figure
                            fetchpriority="low"
                            loading="lazy"
                            onClick={() =>
                              navigate(`/product/${curElem?.route}`)
                            }
                            className="d-flex justify-content-center align-items-center"
                          >
                            <img
                              fetchpriority="low"
                              src={
                                curElem?.featured_img
                                  ? process.env.REACT_APP_IMAGE_BASE_URL +
                                    curElem?.featured_img
                                  : product
                              }
                              alt="pic"
                              loading="lazy"
                              width={128}
                              height={290}
                              style={{
                                height: "220px",
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
                          <NavLink
                            to={`/product/${curElem?.route}`}
                            className="products-titel m-auto"
                            dangerouslySetInnerHTML={{ __html: curElem?.name }}
                          ></NavLink>
                          {curElem?.price_variation?.length > 0 && (
                            <div className="d-flex align-items-center justify-content-center gap-1">
                              <h5 className="price-text">
                                AED{" "}
                                {curElem?.price_variation?.[0]
                                  ?.discount_price !== 0
                                  ? new Intl.NumberFormat().format(
                                      curElem?.price_variation?.[0]
                                        ?.discount_price
                                    )
                                  : curElem?.price_variation?.[0]
                                      ?.offer_price !== 0
                                  ? new Intl.NumberFormat().format(
                                      curElem?.price_variation?.[0]?.offer_price
                                    )
                                  : new Intl.NumberFormat().format(
                                      curElem?.price_variation?.[0]?.price
                                    )}
                              </h5>
                              {curElem?.price_variation?.[0]?.discount_price !==
                                0 ||
                              curElem?.price_variation?.[0]?.offer_price !==
                                0 ? (
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
                          )}
                          {curElem?.price_variation?.[0]?.stock == "0" ? (
                            <p
                              className="cate-text d-table text-center m-auto pt-1"
                              style={{ fontSize: "14px", fontWeight: "600" }}
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
                        disabled={isaddtoCart == curElem?.route ? true : false}
                      >
                        <FaShoppingBasket className="cart_icon" /> Add To Cart
                      </button> */}
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </>
          )}
          {items?.length >= 12 && (
            <div className="view_all_btn_wrape d-flex justify-content-center align-items-center mt-4 ">
              <button
                className="btn shop-bn-ab"
                onClick={() =>
                  navigate(
                    `${
                      activeCategory == "all"
                        ? "/shop/beer"
                        : `/shop/${activeCategory}`
                    }`
                  )
                }
              >
                View All
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default memo(FeaturedProdcuts);
