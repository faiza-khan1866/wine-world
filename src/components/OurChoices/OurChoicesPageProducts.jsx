import React, { useEffect, useState } from "react";
import product from "../../images/products/product.webp";
import { Form } from "react-bootstrap";
// import { FaShoppingBasket, FaExternalLinkAlt } from "react-icons/fa";
import { BsHeart } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaShoppingBasket,
} from "react-icons/fa";
import DataLoader from "../Loader/DataLoader";
import { useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import useCart from "../../Hooks/useCart";
import useWishlist from "../../Hooks/useWishlist";
import WishlistFill from "../Wishlist/WishlistFill";
import AddToCartBtn from "../Cart/AddToCartBtn";

const OurChoicesPageProducts = ({
  items,
  isLoading,
  selectedFilter,
  handleFilterChange,
  cat,
  handlePageClick,
  pageCount,
  toData,
  fromData,
}) => {
  const handleClickScroll = () => {
    const element = document.getElementById("products_list_21");
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location?.search);
  const search = searchParams?.get("search");
  const price = searchParams?.get("price");
  const origin = searchParams?.get("origin");
  const userId = useSelector((state) => state.user.User_Data.user_id);
  const [isaddtoCart, setIsAddToCart] = useState(null);
  const [isAddToWishlist, setIsAddToWishlist] = useState(null);
  const { addtoCart } = useCart();
  const { addtoWishlist, getWishlistItems } = useWishlist();
  const [wishlistItems, setWishlistItems] = useState([]);
  const getWishlist = async () => {
    const { data } = await getWishlistItems();
    setWishlistItems(data);
  };
  useEffect(() => {
    getWishlist();
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
      <div className="shop_top_bar">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <p>
            {items?.length > 0 && fromData && toData
              ? `Showing ${fromData} to ${toData} Results`
              : "Showing 0 Results"}
          </p>
        )}
        <Form.Select
          className="sort_list"
          onChange={handleFilterChange}
          value={selectedFilter}
        >
          <option value="Default Sorting">Default Sorting</option>
          <option value="Latest">Latest</option>
          <option value="Price: High - Low">Price: High - Low</option>
          <option value="Price: Low - High">Price: Low - High</option>
        </Form.Select>
      </div>
      {isLoading ? (
        <DataLoader />
      ) : items?.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 gy-5 gx-lg-5 mt-0">
          {items?.map((curElem) => (
            <div className="col" data-aos="fade-down" key={curElem?.id}>
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
                      getWishlist();
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
                      <AddToCartBtn
                        isaddtoCart={isaddtoCart}
                        route={curElem?.route}
                        setIsAddToCart={setIsAddToCart}
                      />
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
            </div>
          ))}
        </div>
      ) : (
        <div className="py-5 mt-5 text-center">
          {cat == "others" || cat == "cigars" || cat == "liquor-chocolate" ? (
            <h3 className="comm_prod_note ">
              Keep an eye out! Our latest products will be arriving shortly.
            </h3>
          ) : (
            <p className="prod_note">No Product Found!</p>
          )}
        </div>
      )}

      {items?.length > 0 && (
        <div className="pagination_style pt-5">
          <ReactPaginate
            breakLabel="..."
            nextLabel={<FaAngleDoubleRight fontSize={15} />}
            pageCount={pageCount}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            onPageChange={handlePageClick}
            previousLabel={<FaAngleDoubleLeft fontSize={15} />}
            renderOnZeroPageCount={null}
            onClick={handleClickScroll}
          />
        </div>
      )}
    </>
  );
};
export default OurChoicesPageProducts;
