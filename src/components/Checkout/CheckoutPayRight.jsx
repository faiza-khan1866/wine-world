import React from "react";
import { Form } from "react-bootstrap";
import paymentType from "../../images/logo/payment-types.png";
const CheckoutPayRight = ({
  handleSubmit,
  shippingType,
  CartItems,
  SubTotalCart,
  loading,
  totalAmount,
  coupanValue,
  IsCartt,
  formValues,
  handleInputChange,
  shipping_amount,
  showAddAddressForm,
}) => {
  return (
    <>
      <div className="checkout-right mt-5 mt-lg-0" data-aos="fade-down">
        <h2>Your order</h2>
        <p>
          Get free delivery on orders over <b>AED 100! </b>
          For orders below, enjoy convenience for just<b> AED 15</b> delivery
          fee.
        </p>
        <div className="oder-summary-item mt-3">
          <table className="table checkout-table">
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Quantity</th>
                <th scope="col">amount</th>
              </tr>
            </thead>
            <tbody>
              {IsCartt
                ? CartItems?.map((item) => (
                    <tr>
                      <td>
                        <span
                          dangerouslySetInnerHTML={{ __html: item?.name }}
                        />{" "}
                        <p>
                          {item?.price_variation?.[0]?.variation?.name}{" "}
                          {item?.price_variation?.[0]?.values?.name}
                        </p>
                        <p>
                          {item?.price_variation?.[0]?.pack_of &&
                            `Pack Of ${item?.price_variation?.[0]?.pack_of}`}
                        </p>
                      </td>
                      <td>x {item?.qty}</td>
                      <td>
                        AED{" "}
                        {new Intl.NumberFormat().format(
                          (item?.price_variation?.[0]?.discount_price !== 0
                            ? item?.price_variation?.[0]?.discount_price
                            : item?.price_variation?.[0]?.offer_price !== 0
                            ? item?.price_variation?.[0]?.offer_price
                            : item?.price_variation?.[0]?.price) * item?.qty
                        )}
                      </td>
                    </tr>
                  ))
                : "No Order has been placed yet!"}
            </tbody>
          </table>
        </div>
        <div className="oder-right-details-new">
          <hr />
          <div className="price-sec-order">
            <p className="price-am">
              Price{" "}
              <span>AED {new Intl.NumberFormat().format(SubTotalCart)} </span>
            </p>

            <p className="delivery-am">
              Delivery charges{" "}
              <span>
                {/* {shippingType == "pickup"
                  ? "Free"
                  : new Intl.NumberFormat().format(totalAmount?.toFixed(2)) <
                    100
                  ? "AED 25"
                  : "Free"} */}
                {shipping_amount == "Free"
                  ? shipping_amount
                  : "AED " + shipping_amount}
              </span>
            </p>
            <p className="discount-am">
              Discount price <span> AED {coupanValue}</span>
            </p>
            <div className="total-price p-0">
              <p className="discount-am">
                Total Amount{" "}
                <span>
                  AED {new Intl.NumberFormat().format(totalAmount?.toFixed(2))}
                </span>
              </p>
            </div>
            <p className="vat-am mb-lg-0">Inclusive of 5% VAT</p>
          </div>
        </div>

        <div className="oder-right-details-new">
          <hr />
          <div className="price-sec-order">
            <p className="price-am">Payment Method</p>
            <p className="price-am">
              <Form.Group controlId="payment_type">
                <Form.Check
                  type="radio"
                  name="payment_type"
                  inline
                  label={
                    <img
                      className="paymentTypeImg"
                      src={paymentType}
                      alt="payment"
                    />
                  }
                  value="network"
                  onChange={handleInputChange}
                  checked={formValues?.payment_type == "network"}
                />
              </Form.Group>
            </p>
            <p className="price-am">
              <Form.Group controlId="payment_type">
                <Form.Check
                  type="radio"
                  name="payment_type"
                  inline
                  label="COD"
                  value="cod"
                  onChange={handleInputChange}
                  checked={formValues?.payment_type == "cod"}
                />
              </Form.Group>
            </p>
          </div>
        </div>
      </div>
      {showAddAddressForm ? null : (
        <button
          className="btn paybn mt-3 w-100"
          onClick={handleSubmit}
          disabled={loading ? true : false}
        >
          {loading
            ? "Sending..."
            : formValues?.payment_type == "cod"
            ? "Order Now"
            : "Pay Now"}
        </button>
      )}
    </>
  );
};
export default CheckoutPayRight;
