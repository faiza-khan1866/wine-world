import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  lazy,
  Suspense,
} from "react";
import { QueryCache } from "react-query";
import { toast } from "react-toastify";
// import {
//   fetchOthersDropDownData,
//   useFetchOthersDropDownData,
// } from "../http/apiService";
import {
  BsPerson,
  BsCart3,
  BsHeart,
  BsSearch,
  BsBasket2,
  BsPersonFill,
} from "react-icons/bs";
import { FaRegWindowClose } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../images/logo/logo.png";
import whiteLogo from "../images/logo/whiteLogo.png";
import Login from "../components/profile/Login";
import useCart from "../Hooks/useCart";
import useWishlist from "../Hooks/useWishlist";
import { useDispatch, useSelector } from "react-redux";
// import VerifyAccount from "../components/profile/VerifyAccount";

import { loginPopUp, verifyAccountPopUp } from "../appRedux/actions/userAction";
import { MdClose } from "react-icons/md";
import SearchBar from "./SearchBar";
import TopAppSec from "./TopAppSec";
import useWindowDimensions from "../Hooks/useWindowDimensions ";
import debounce from "lodash/debounce";
const VerifyAccount = lazy(() => import("../components/profile/VerifyAccount"));

const Header = () => {
  const [search, setSearch] = useState(false);
  const [searchMobile, setSearchMobile] = useState(false);
  const searchRef = useRef();
  const searchRefMobile = useRef();
  // const queryCache = new QueryCache();
  // const { data: dropdownData } = useFetchOthersDropDownData(queryCache);
  // const othersData = dropdownData?.data?.sub_category || [];
  const navigate = useNavigate();
  const [scroll, setScroll] = useState(false);
  const IsVerify = useSelector((state) => state.user.isEmailVerify);
  const User_Verification = useSelector(
    (state) => state.user.User_Verification
  );
  let userData = useSelector((state) => state.user.User_Details);
  const user_type = useSelector((state) => state.user.User_Data.user_type);
  const userId = useSelector((state) => state.user.User_Data.user_id);
  const isUserLogIn = useSelector((state) => state.user.isUser);
  const loginPopUpShow = useSelector((state) => state?.user?.loginPopUpShow);
  const {
    GetCartLength,
    GetCartData,
    removeFromCart,
    CartItemsSum,
    isCart,
    getCartItems,
  } = useCart();
  let CartItems = GetCartData();
  let SubTotalCart = useMemo(() => CartItemsSum(), [CartItems]);
  const IsCartt = isCart();
  const UserData = useSelector((state) => state.user.User_Verification);
  const { GetWishlistLength, getWishlistItems } = useWishlist();
  const dispatch = useDispatch();
  const [iconFont, seticonFont] = useState("24px");
  const [iconFontPerson, seticonFontPerson] = useState("28px");
  const [searhFontSize, setsearhFontSize] = useState("22px");

  const { width } = useWindowDimensions();

  useEffect(() => {
    getCartItems();
    getWishlistItems();
  }, [userId]);

  useEffect(() => {
    if (width <= "420") {
      seticonFont("20px");
      seticonFontPerson("24px");
      setsearhFontSize("20px");
    } else {
      seticonFont("24px");
      seticonFontPerson("28px");
      setsearhFontSize("22px");
    }
  }, [width]);

  // const [othersData, setOthersData] = useState([]);

  // useEffect(() => {
  //   const fetchOthersDropDownListData = async () => {
  //     try {
  //       const { data } = await fetchOthersDropDownData();
  //       setOthersData(data?.sub_category);
  //     } catch (error) {
  //       console.error("Error fetching Data:", error);
  //     }
  //   };

  //   fetchOthersDropDownListData();
  // }, []);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 100);
    });
  }, []);

  const handleCheckout = () => {
    toast.warn("Please Login First to Checkout.", {
      autoClose: 3000,
      theme: "dark",
    });
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setSearch(false);
    }
  };
  window.addEventListener("click", handleClickOutside);

  function SarchIcon(props) {
    const updateSearchBar = debounce(async () => {
      props?.setSearch(!props?.search);
    }, 500);
    return (
      <span
        onClick={() => updateSearchBar()}
        style={{ zIndex: "5555" }}
        className="order-1 mgl2"
      >
        {!props?.search ? (
          <BsSearch size={searhFontSize} />
        ) : (
          <FaRegWindowClose size={searhFontSize} className="CloseIconSearch" />
        )}
      </span>
    );
  }
  const handleClickMobileOutside = (event) => {
    if (
      searchRefMobile.current &&
      !searchRefMobile.current.contains(event.target)
    ) {
      setSearchMobile(false);
    }
  };
  window.addEventListener("click", handleClickMobileOutside);

  return (
    <>
      {/* <header className={scroll ? "fixed-menu" : "hed-n"} ref={searchRefMobile}> */}
      <header className="fixed-menu" ref={searchRefMobile}>
        <div className="mn-head">
          {/* <TopAppSec searchMobile={searchMobile} /> */}
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-dark align-items-center justify-content-between">
              <NavLink to="/" className="navbar-brand" href="#">
                <img
                  src={whiteLogo}
                  className="logo-main rounded"
                  alt="logo"
                  height={80}
                  width={88}
                />
                <img
                  src={whiteLogo}
                  className="logo-mobile rounded"
                  alt="logo"
                  height={80}
                  width={88}
                />
              </NavLink>
              <div className="d-flex justify-content-between align-items-center mbile-checkout ms-auto d-lg-none">
                <a className="btn com-link m-0 searchbar-icon">
                  <BsSearch
                    size={searhFontSize}
                    onClick={() => setSearchMobile(!searchMobile)}
                  />
                  {/* {searchMobile && <SearchBar />} */}
                </a>
                {user_type == "corporate" ? (
                  ""
                ) : (
                  <>
                    {isUserLogIn ? (
                      <div className="dropdown">
                        <button
                          className="btn dropdown-toggle"
                          type="button"
                          id="dropdownMenuButton1"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <BsBasket2 size={iconFont} className="mbl-cart" />
                          <span className="cart-nuber" style={{ left: "27px" }}>
                            {GetCartLength()}
                          </span>
                        </button>
                        <ul
                          className="dropdown-menu shadow cart-dropdown-ne"
                          aria-labelledby="dropdownMenuButton1"
                        >
                          <li>
                            {IsCartt ? (
                              CartItems?.map((items) => (
                                <div className="comon-cart-ps">
                                  <div className="d-flex align-items-center justify-content-between">
                                    <NavLink
                                      exact="true"
                                      to={`/product/${items?.route}`}
                                      className="products-sm-pic"
                                    >
                                      <figure>
                                        <img
                                          src={`${process.env.REACT_APP_IMAGE_BASE_URL}/${items?.featured_img}`}
                                          alt="bn"
                                          height={60}
                                          width={60}
                                        />
                                      </figure>
                                    </NavLink>
                                    <div className="cart-ps-details">
                                      <NavLink
                                        exact="true"
                                        to={`/product/${items?.route}`}
                                        className="titel-crt-products"
                                      >
                                        {items?.name}
                                      </NavLink>
                                      <h6>
                                        AED{" "}
                                        {items?.price_variation?.[0]
                                          ?.discount_price !== 0
                                          ? new Intl.NumberFormat().format(
                                              items?.price_variation?.[0]
                                                ?.discount_price
                                            )
                                          : items?.price_variation?.[0]
                                              ?.offer_price !== 0
                                          ? new Intl.NumberFormat().format(
                                              items?.price_variation?.[0]
                                                ?.offer_price
                                            )
                                          : new Intl.NumberFormat().format(
                                              items?.price_variation?.[0]?.price
                                            )}{" "}
                                        <span className="titel-crt-quantity">
                                          x{items?.qty}
                                        </span>
                                      </h6>
                                    </div>
                                    <a className="close-crt">
                                      <FaRegWindowClose
                                        onClick={() =>
                                          removeFromCart(items?.cart_id)
                                        }
                                      />
                                    </a>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p className="text-center m-0">
                                <BsCart3 size={iconFont} color="#d00035" />
                                <br />
                                Cart is Empty
                              </p>
                            )}
                          </li>
                          {IsCartt && (
                            <li>
                              <div className="sub-total-products d-flex align-items-center justify-content-between">
                                <h6> Subtotal: </h6>
                                <h4>
                                  AED{" "}
                                  {new Intl.NumberFormat().format(SubTotalCart)}
                                </h4>
                              </div>
                            </li>
                          )}
                          {IsCartt ? (
                            <>
                              <li>
                                <NavLink
                                  exact
                                  to="/cart"
                                  className="btn d-table cart-drop-bn"
                                >
                                  View Cart
                                </NavLink>
                              </li>
                              {isUserLogIn ? (
                                <li>
                                  <NavLink
                                    exact
                                    to="/checkout"
                                    className="btn d-table check-drop-bn"
                                  >
                                    Check out
                                  </NavLink>
                                </li>
                              ) : (
                                <li>
                                  <NavLink
                                    exact
                                    className="btn d-table check-drop-bn"
                                    onClick={handleCheckout}
                                  >
                                    Check out
                                  </NavLink>
                                </li>
                              )}
                            </>
                          ) : null}
                        </ul>
                      </div>
                    ) : (
                      <a
                        className="btn com-link login-top p-0 ms-1 me-3 position-relative"
                        onClick={() => navigate("/cart")}
                      >
                        <BsBasket2 size={iconFont} />
                        <span className="cat-count">0</span>
                      </a>
                    )}
                    {isUserLogIn ? (
                      <a
                        className="btn com-link login-top p-0 ms-2 position-relative"
                        onClick={() => navigate("/wishlist")}
                      >
                        <BsHeart size={iconFont} />
                        <span
                          className="cat-count"
                          style={{ bottom: "-6px", left: "12px" }}
                        >
                          {GetWishlistLength()}
                        </span>
                      </a>
                    ) : (
                      <a
                        className="btn com-link login-top p-0 ms-2 position-relative"
                        onClick={() => navigate("/wishlist")}
                      >
                        <BsHeart size={iconFont} />
                        <span
                          className="cat-count"
                          style={{ bottom: "-6px", left: "12px" }}
                        >
                          0
                        </span>
                      </a>
                    )}
                  </>
                )}
                {isUserLogIn ? (
                  <a
                    className="btn com-link login-top ms-3 p-0"
                    onClick={() => navigate("/account")}
                  >
                    {userData?.profile?.includes("https://") &&
                    userData?.profile ? (
                      <img
                        className="headerProfile_img"
                        src={userData?.profile}
                        alt="user"
                      />
                    ) : userData?.profile ? (
                      <img
                        className="headerProfile_img"
                        src={
                          "https://royal-spirit.b-cdn.net/profile/" +
                          userData?.profile
                        }
                        alt="wine"
                      />
                    ) : (
                      <BsPerson size={iconFontPerson} />
                    )}
                  </a>
                ) : (
                  <>
                    {UserData?.full_name ? (
                      <a
                        className="btn com-link login-top ms-3 p-0"
                        onClick={() => {
                          dispatch(verifyAccountPopUp(true));
                        }}
                      >
                        {userData?.profile?.includes("https://") &&
                        userData?.profile ? (
                          <img
                            className="headerProfile_img"
                            src={userData?.profile}
                            alt="user"
                          />
                        ) : userData?.profile ? (
                          <img
                            className="headerProfile_img"
                            src={
                              "https://royal-spirit.b-cdn.net/profile/" +
                              userData?.profile
                            }
                            alt="wine"
                          />
                        ) : (
                          <BsPerson size={iconFontPerson} />
                        )}
                      </a>
                    ) : (
                      <a
                        className="btn com-link login-top ms-3 p-0"
                        onClick={() => dispatch(loginPopUp(true))}
                      >
                        {userData?.profile?.includes("https://") &&
                        userData?.profile ? (
                          <img
                            className="headerProfile_img"
                            src={userData?.profile}
                            alt="user"
                          />
                        ) : userData?.profile ? (
                          <img
                            className="headerProfile_img"
                            src={
                              "https://royal-spirit.b-cdn.net/profile/" +
                              userData?.profile
                            }
                            alt="wine"
                          />
                        ) : (
                          <BsPerson size={iconFontPerson} />
                        )}
                      </a>
                    )}
                  </>
                )}
              </div>
              <button
                className="navbar-toggler ms-3"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#mobile-menu"
                aria-controls="offcanvasExample"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse "
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav mx-auto mb-2 mb-lg-0 align-items-lg-center">
                  {/* <li className="nav-item">
                    <NavLink className="nav-link" to="/">
                      Home
                    </NavLink>
                  </li> */}
                  {/* <li className="nav-item">
                    <NavLink className="nav-link" to="/about">
                      About Us
                    </NavLink>
                  </li> */}
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/shop/beer">
                      Beer
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/shop/wine">
                      Wine
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/shop/spirit">
                      Spirit
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/shop/champagne">
                      Champagne
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/shop/premium">
                      Premium
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/shop/promotion">
                      Promotion
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink className="nav-link" to="/shop/others">
                      Others
                    </NavLink>
                  </li>

                  {/* <li className="nav-item dropdown dropdown-mega position-static">
                    <NavLink
                      className="nav-link mega-menu-a dropdown-toggle"
                      to="/shop/others"
                      data-bs-auto-close="outside"
                    >
                      Others
                    </NavLink>

                    <ul className="dropdown-menu dropdown-menu1 shadow">
                      <li className="mega-content px-2">
                        <div className="container-fluid">
                          <div className="row row-cols-md-1 justify-content-between">
                            <div className="col">
                              <div className="comon-menu-div">
                                <ul className="list-unstyled">
                                  {othersData?.map((x) => (
                                    <li>
                                      <NavLink to={`/shop/${x?.route}`}>
                                        {x?.name}
                                      </NavLink>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </li> */}
                  {/* <li className="nav-item">
                    <NavLink className="nav-link" to="/corporate">
                      Corporate
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/news">
                      News
                    </NavLink>
                  </li> */}
                  {/* <li className="nav-item">
                    <NavLink className="nav-link" to="/gift">
                      Gift
                    </NavLink>
                  </li> */}
                </ul>
              </div>

              <div className="justify-content-lg-end right-menu d-none  d-lg-grid justify-content-end">
                <ul className="list-unstyled mb-0">
                  <li className="d-flex align-items-center">
                    <a
                      className="btn com-link m-0 searchbar-icon d-flex flex-row align-items-center "
                      ref={searchRef}
                    >
                      <SarchIcon search={search} setSearch={setSearch} />

                      {search && (
                        <SearchBar
                          setSearch={setSearch}
                          setSearchMobile={setSearchMobile}
                        />
                      )}
                    </a>
                    {user_type == "corporate" ? (
                      ""
                    ) : (
                      <>
                        {isUserLogIn ? (
                          <div className="dropdown position-relative me-2">
                            <button
                              className="btn dropdown-toggle com-link cart-new-icon "
                              type="button"
                              id="dropdownMenuButton1"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <BsBasket2 size={iconFont} />
                            </button>
                            <ul
                              className="dropdown-menu shadow cart-dropdown-ne"
                              aria-labelledby="dropdownMenuButton1"
                            >
                              <li>
                                {IsCartt ? (
                                  CartItems?.map((items) => (
                                    <div className="comon-cart-ps">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <NavLink
                                          to={`/product/${items?.route}`}
                                          className="products-sm-pic"
                                        >
                                          <figure>
                                            <img
                                              src={`${process.env.REACT_APP_IMAGE_BASE_URL}/${items?.featured_img}`}
                                              alt="bn"
                                              height={80}
                                              width={88}
                                            />
                                          </figure>
                                        </NavLink>
                                        <div className="cart-ps-details">
                                          <NavLink
                                            to={`/product/${items?.route}`}
                                            className="titel-crt-products title-product-cart"
                                          >
                                            {items?.name}
                                          </NavLink>
                                          <h6>
                                            AED{" "}
                                            {/* {new Intl.NumberFormat().format(
                                            items?.Selected_Price?.price
                                          )}{" "} */}
                                            {items?.price_variation?.[0]
                                              ?.discount_price !== 0
                                              ? new Intl.NumberFormat().format(
                                                  items?.price_variation?.[0]
                                                    ?.discount_price
                                                )
                                              : items?.price_variation?.[0]
                                                  ?.offer_price !== 0
                                              ? new Intl.NumberFormat().format(
                                                  items?.price_variation?.[0]
                                                    ?.offer_price
                                                )
                                              : new Intl.NumberFormat().format(
                                                  items?.price_variation?.[0]
                                                    ?.price
                                                )}{" "}
                                            <span className="titel-crt-quantity">
                                              x{items?.qty}
                                            </span>
                                          </h6>
                                        </div>
                                        <a id="" className="close-crt">
                                          <FaRegWindowClose
                                            onClick={() =>
                                              removeFromCart(items?.cart_id)
                                            }
                                          />
                                        </a>
                                      </div>
                                    </div>
                                  ))
                                ) : (
                                  <p className="text-center m-0">
                                    <BsCart3 size={iconFont} color="#d00035" />
                                    <br />
                                    Cart is Empty
                                  </p>
                                )}
                              </li>
                              {IsCartt && (
                                <li>
                                  <div className="sub-total-products d-flex align-items-center justify-content-between">
                                    <h6> Subtotal: </h6>
                                    <h4>
                                      AED{" "}
                                      {new Intl.NumberFormat().format(
                                        SubTotalCart
                                      )}
                                    </h4>
                                  </div>
                                </li>
                              )}
                              {IsCartt && (
                                <>
                                  <li>
                                    <NavLink
                                      to="/cart"
                                      className="btn cart-drop-bn"
                                    >
                                      View Cart
                                    </NavLink>
                                  </li>
                                  {isUserLogIn ? (
                                    <li>
                                      <NavLink
                                        to="/checkout"
                                        className="btn check-drop-bn"
                                      >
                                        Check out
                                      </NavLink>
                                    </li>
                                  ) : (
                                    <li>
                                      <NavLink
                                        className="btn check-drop-bn"
                                        onClick={handleCheckout}
                                      >
                                        Check out
                                      </NavLink>
                                    </li>
                                  )}
                                </>
                              )}
                            </ul>

                            <span
                              className="cat-count"
                              style={{ left: "27px" }}
                            >
                              {GetCartLength()}
                            </span>
                          </div>
                        ) : (
                          <a
                            className="btn com-link login-top p-0 ms-1 me-3 position-relative"
                            onClick={() => navigate("/cart")}
                          >
                            <BsBasket2 size={iconFont} />
                            <span className="cat-count">0</span>
                          </a>
                        )}
                        {isUserLogIn ? (
                          <a
                            className="btn com-link login-top p-0 m-0 position-relative"
                            onClick={() => navigate("/wishlist")}
                          >
                            <BsHeart size={iconFont} />
                            <span
                              className="cat-count"
                              style={{ bottom: "-6px", left: "12px" }}
                            >
                              {GetWishlistLength()}
                            </span>
                          </a>
                        ) : (
                          <a
                            className="btn com-link login-top p-0 m-0 position-relative"
                            onClick={() => navigate("/wishlist")}
                          >
                            <BsHeart size={iconFont} />
                            <span
                              className="cat-count"
                              style={{ bottom: "-6px", left: "12px" }}
                            >
                              0
                            </span>
                          </a>
                        )}
                      </>
                    )}
                    {isUserLogIn ? (
                      <a
                        className="btn com-link login-top p-0"
                        onClick={() => navigate("/account")}
                      >
                        {userData?.profile?.includes("https://") &&
                        userData?.profile ? (
                          <img
                            className="headerProfile_img"
                            src={userData?.profile}
                            alt="user"
                          />
                        ) : userData?.profile ? (
                          <img
                            className="headerProfile_img"
                            src={
                              "https://royal-spirit.b-cdn.net/profile/" +
                              userData?.profile
                            }
                            alt="wine"
                          />
                        ) : (
                          <BsPerson size={iconFontPerson} />
                        )}
                      </a>
                    ) : (
                      <>
                        {UserData?.full_name ? (
                          <a
                            className="btn com-link login-top ms-3 p-0"
                            onClick={() => {
                              dispatch(verifyAccountPopUp(true));
                            }}
                          >
                            {userData?.profile?.includes("https://") &&
                            userData?.profile ? (
                              <img
                                className="headerProfile_img"
                                src={userData?.profile}
                                alt="user"
                              />
                            ) : userData?.profile ? (
                              <img
                                className="headerProfile_img"
                                src={
                                  "https://royal-spirit.b-cdn.net/profile/" +
                                  userData?.profile
                                }
                                alt="wine"
                              />
                            ) : (
                              <BsPerson size={iconFontPerson} />
                            )}
                          </a>
                        ) : (
                          <a
                            className="btn com-link login-top ms-3 p-0"
                            onClick={() => dispatch(loginPopUp(true))}
                          >
                            {userData?.profile?.includes("https://") &&
                            userData?.profile ? (
                              <img
                                className="headerProfile_img"
                                src={userData?.profile}
                                alt="user"
                              />
                            ) : userData?.profile ? (
                              <img
                                className="headerProfile_img"
                                src={
                                  "https://royal-spirit.b-cdn.net/profile/" +
                                  userData?.profile
                                }
                                alt="wine"
                              />
                            ) : (
                              <BsPerson size={iconFontPerson} />
                            )}
                          </a>
                        )}
                      </>
                    )}

                    {IsVerify && User_Verification ? (
                      <Suspense fallback={"loading..."}>
                        <VerifyAccount />
                      </Suspense>
                    ) : (
                      <Login
                        show={loginPopUpShow}
                        onHide={() => dispatch(loginPopUp(false))}
                      />
                    )}
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
        {searchMobile && (
          <div className="searchbar-icon pb-3 mobileSearch">
            <SearchBar
              setSearch={setSearch}
              setSearchMobile={setSearchMobile}
            />
          </div>
        )}
      </header>
      <div
        className="offcanvas offcanvas-start menu-mobile-modal"
        tabindex="-1"
        id="mobile-menu"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <NavLink to="/">
            <img
              src={whiteLogo}
              alt="logom"
              className="rounded"
              height={80}
              width={88}
            />
          </NavLink>
          <button
            type="button"
            className="close_btn"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <MdClose />
          </button>
        </div>
        <div className="offcanvas-body menu-modal">
          <ul className="list-unstyled mt-4">
            <li data-bs-dismiss="offcanvas">
              <NavLink className="dropdown-item" to="/">
                Home
              </NavLink>
            </li>
            <li data-bs-dismiss="offcanvas">
              <NavLink className="dropdown-item" to="/shop/beer">
                Beer
              </NavLink>
            </li>
            <li data-bs-dismiss="offcanvas">
              <NavLink className="dropdown-item" to="/shop/wine">
                Wine
              </NavLink>
            </li>
            <li data-bs-dismiss="offcanvas">
              <NavLink className="dropdown-item" to="/shop/spirit">
                Spirit
              </NavLink>
            </li>
            <li data-bs-dismiss="offcanvas">
              <NavLink className="dropdown-item" to="/shop/champagne">
                Champagne
              </NavLink>
            </li>
            <li data-bs-dismiss="offcanvas">
              <NavLink className="dropdown-item" to="/shop/premium">
                Premium
              </NavLink>
            </li>
            <li data-bs-dismiss="offcanvas">
              <NavLink className="dropdown-item" to="/shop/sale">
                Promotion
              </NavLink>
            </li>

            <li data-bs-dismiss="offcanvas">
              <NavLink className="dropdown-item" to="/shop/others">
                Others
              </NavLink>
            </li>
            {/* <div className="dropdown postion-relative">
              <button
                className="btn dropdown-toggle mega-btn text-start col-12"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Others
              </button>
              <ul
                className="dropdown-menu mobile-mega-menu col-12"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <div className="comon-menu-div">
                    <ul className="list-unstyled">
                      {othersData?.map((x) => (
                        <li data-bs-dismiss="offcanvas">
                          <NavLink to={`/shop/${x?.route}`}>{x?.name}</NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ul>
            </div> */}
            {/* <li data-bs-dismiss="offcanvas">
              <NavLink className="dropdown-item" to="/corporate">
                Corporate
              </NavLink>
            </li> */}
            {/* <li data-bs-dismiss="offcanvas">
              <NavLink className="dropdown-item" to="/news">
                News
              </NavLink>
            </li> */}
            {/* <li data-bs-dismiss="offcanvas">
              <NavLink className="dropdown-item" to="/gift">
                Gift
              </NavLink>
            </li> */}
          </ul>
        </div>
      </div>
    </>
  );
};
export default Header;
