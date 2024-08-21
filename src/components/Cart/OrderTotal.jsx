import React, { useMemo, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { createCouponData, fetchCouponsData } from "../../http/apiService";
import { FaLongArrowAltRight } from "react-icons/fa";
import useCart from "../../Hooks/useCart";
import { useDispatch, useSelector } from "react-redux";
import { couponCodeValue } from "../../appRedux/actions/cartAction";

const OrderTotal = ({ userId, isUserLogIn }) => {
  const dispatch = useDispatch();
  const { CartItemsSum, GetCartData } = useCart();
  let CartItems = GetCartData();
  let SubTotalCart = useMemo(() => CartItemsSum(), [CartItems]);
  const coupanCodeValue = useSelector((state) => state?.cart?.coupanCodeValue);
  const total_amount = SubTotalCart - Number(coupanCodeValue);
  const [couponList, setCouponList] = useState([]);

  useEffect(() => {
    const fetchCouponsListData = async () => {
      try {
        const { data } = await fetchCouponsData();
        setCouponList(data);
      } catch (error) {
        console.error("Error fetching Data:", error);
      }
    };

    fetchCouponsListData();
  }, []);

  const initailObject = {
    user_id: userId,
    coupon_id: "",
  };
  const [couponData, setCouponData] = useState(initailObject);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setCouponData({
      ...couponData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchCouponFormData = async (updatedData) => {
    try {
      const response = await createCouponData(updatedData);
      if (response.data.status === 200 || response.data.status === 201) {
        setLoading(false);
        toast.success(response?.data?.message, {
          autoClose: 3000,
          theme: "dark",
        });
        dispatch(couponCodeValue(response?.data?.coupon_value));
        setCouponData({ ...initailObject });
      } else if (response.data.status == 400) {
        setLoading(false);
        toast.error(response?.data?.message, {
          autoClose: 3000,
          theme: "dark",
        });
        setCouponData({ ...initailObject });
      }
    } catch (error) {
      console.error("Error fetching Data:", error);
      setLoading(false);
      toast.error("Something Went Wrong!", {
        autoClose: 3000,
        theme: "dark",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isUserLogIn) {
      toast.warn("Please Login First to Enter Coupon Code.", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    } else if (couponData.coupon_id === "") {
      toast.warn("Please Enter Coupon Code.", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }
    let updatedData = { ...couponData };
    setLoading(true);
    fetchCouponFormData(updatedData);
  };

  const handlePlaceOrder = () => {
    toast.warn("Please Login First to Checkout.", {
      autoClose: 3000,
      theme: "dark",
    });
  };

  return (
    <>
      <div className="oder-total-div mt-5 mt-md-0" data-aos="fade-down">
        <h2>Order details</h2>
        <hr />
        <div className="price-table">
          <p className="price-am">
            Price{" "}
            <span>AED {new Intl.NumberFormat().format(SubTotalCart)}</span>
          </p>
          {/* <p className="delivery-am">
            Delivery charges{" "}
            <span> {total_amount < 75 ? "AED 25" : "Free"} </span>
          </p> */}
          <p className="discount-am">
            Discount price <span> AED {coupanCodeValue} </span>
          </p>
          <div className="form-group d-flex align-items-center">
            <select
              className="form-control new-input"
              name="coupon_id"
              value={couponData?.coupon_id}
              onChange={handleInputChange}
            >
              <option>Discount Coupon</option>
              {couponList?.map((x) => (
                <option>{x?.name}</option>
              ))}
            </select>
            <input
              type="button"
              value={loading ? "Sending..." : "Apply"}
              className="btn cp-bn me-0"
              onClick={handleSubmit}
              disabled={loading ? true : false}
            />
          </div>
          <div className="total-price">
            <p className="discount-am mb-lg-0">
              Total Amount{" "}
              <span>
                AED {new Intl.NumberFormat().format(total_amount?.toFixed(2))}
              </span>
            </p>
          </div>
          {/* <p className="price-am">
            Shipping Charges <span>AED 15</span>
          </p> */}
          <p className="vat-am mb-lg-0">Inclusive of 5% VAT</p>
        </div>
      </div>
      {isUserLogIn ? (
        <NavLink to="/checkout" className="btn mt-3 w-100 paybn">
          Place Order <FaLongArrowAltRight />
        </NavLink>
      ) : (
        <button className="btn mt-3 w-100 paybn" onClick={handlePlaceOrder}>
          Place Order <FaLongArrowAltRight />
        </button>
      )}
    </>
  );
};
export default OrderTotal;
