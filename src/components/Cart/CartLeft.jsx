import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaRegTimesCircle } from "react-icons/fa";
import Count from "../common/Count";
import useCart from "../../Hooks/useCart";
import { createStockData } from "../../http/apiService";
import { useNavigate } from "react-router-dom";

const CartLeft = () => {
  const navigate = useNavigate();
  const { removeFromCart } = useCart();
  // let cartItemsList = GetCartData();
  const cartItems = useSelector((state) => state.cart.CartItems);

  return (
    <>
      <div className="cart-left-sec" data-aos="fade-up">
        <h2> Order Summary </h2>
        <hr />
        <div className="tbale-cart">
          {cartItems?.cart?.map((item) => (
            <>
              <div className="comon-sec-div-mn">
                <div className="row align-items-center">
                  <div className="col-lg-4">
                    <div className="cart-products-div">
                      <a id="#" className="btn cross-bn">
                        <FaRegTimesCircle
                          onClick={() => removeFromCart(item?.cart_id)}
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
                      <h5 className="mb-2 price-text">
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
                        <span className="products-size text-dark">
                          x {item?.qty} = AED{" "}
                          {new Intl.NumberFormat().format(
                            (item?.price_variation?.[0]?.discount_price !== 0
                              ? item?.price_variation?.[0]?.discount_price
                              : item?.price_variation?.[0]?.offer_price !== 0
                              ? item?.price_variation?.[0]?.offer_price
                              : item?.price_variation?.[0]?.price) * item?.qty
                          )}
                        </span>
                      </h5>
                      <Count
                        item={item}
                        stock={item?.price_variation?.[0]?.stock}
                      />
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
          </div>
        </div>
      </div>
    </>
  );
};
export default CartLeft;
