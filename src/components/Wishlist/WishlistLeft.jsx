import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaRegTimesCircle, FaShoppingBasket } from "react-icons/fa";
import useWishlist from "../../Hooks/useWishlist";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useCart from "../../Hooks/useCart";

const WishlistLeft = () => {
  const navigate = useNavigate();
  const { getWishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addtoCart } = useCart();
  const userId = useSelector((state) => state.user.User_Data.user_id);
  const wishlistItems = useSelector((state) => state.wishlist.WishlistItems);

  useEffect(() => {
    getWishlistItems();
  }, [userId]);

  return (
    <>
      <div className="cart-left-sec" data-aos="fade-up">
        <h2>Wishlist summary</h2>
        <hr />
        <div className="tbale-cart">
          {wishlistItems?.map((item) => (
            <>
              <div className="comon-sec-div-mn">
                <div className="row align-items-center">
                  <div className="col-lg-4">
                    <div className="cart-products-div">
                      <a id="#" className="btn cross-bn">
                        <FaRegTimesCircle
                          onClick={() => removeFromWishlist(item?.wishlist_id)}
                        />
                      </a>
                      <figure className="order-pic">
                        <img
                          src={`${process.env.REACT_APP_IMAGE_BASE_URL}/${item?.featured_img}`}
                          alt="ps"
                        />
                      </figure>
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div className="wishlist_wrape">
                      <div className="pro-sec">
                        <h6 className="products-cate mt-2 mt-lg-0">
                          {item?.category?.name}
                        </h6>
                        <Link
                          to={`/product/${item?.route}`}
                          className="cart-products-titel"
                        >
                          {item?.name}
                        </Link>
                        <h5 className="products-size mt-2 mt-lg-0">
                          {item?.price_variation?.[0]?.variation?.name}{" "}
                          {item?.price_variation?.[0]?.values?.name}{" "}
                          {item?.price_variation?.[0]?.pack_of &&
                            `Pack Of ${item?.price_variation?.[0]?.pack_of}`}
                        </h5>
                        <h5 className="products-size mt-2">
                          AED{" "}
                          {item?.price_variation?.[0]?.discount_price !== 0
                            ? new Intl.NumberFormat().format(
                                item?.price_variation?.[0]?.discount_price
                              )
                            : item?.price_variation?.[0]?.offer_price !== 0
                            ? new Intl.NumberFormat().format(
                                item?.price_variation?.[0]?.offer_price
                              )
                            : new Intl.NumberFormat().format(
                                item?.price_variation?.[0]?.price
                              )}{" "}
                          {item?.price_variation?.[0]?.discount_price !== 0 ||
                          item?.price_variation?.[0]?.offer_price !== 0 ? (
                            <span className="old-pice text-decoration-line-through">
                              AED{" "}
                              {new Intl.NumberFormat().format(
                                item?.price_variation?.[0]?.price
                              )}
                            </span>
                          ) : (
                            ""
                          )}
                        </h5>
                      </div>
                      <button
                        className="btn cart-bn-ds"
                        disabled={
                          item?.price_variation?.[0]?.stock == "0"
                            ? true
                            : false
                        }
                        onClick={() => {
                          let formData = {
                            user_id: userId,
                            product_id: item?.price_variation?.[0]?.product_id,
                            product_variation_id:
                              item?.price_variation?.[0]?.variation_id,
                            product_value_id:
                              item?.price_variation?.[0]?.variation_value_id,
                            qty: 1,
                          };
                          let is_wish_id = item?.wishlist_id;
                          addtoCart(formData, is_wish_id);
                        }}
                      >
                        <FaShoppingBasket className="cart_icon" /> Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
          <div className="cart-btn">
            <button
              type="button"
              className="btn mt-3 continue-shopping-btn"
              onClick={() => navigate("/shop/beer")}
            >
              Continue Shopping
            </button>
            <button
              type="button"
              className="btn btn-danger mt-3 clear-cart-btn"
              onClick={() => clearWishlist()}
            >
              Clear Wishlist
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default WishlistLeft;
