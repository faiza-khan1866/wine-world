import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import SubpageBanner from "../components/common/SubpageBanner";
import bannerImg from "../images/banners/shippingdeliverybanner.png";

const ShippingDelivery = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Helmet>
        <title>Shipping & Delivery | Royal Spirit</title>
        <meta name="description" content="Shipping & Delivery" />
        <link rel="canonical" href="https://royalspirit.ae/shipping-delivery" />
      </Helmet>
      <SubpageBanner
        name="Shipping & Delivery"
        indexpage="Home"
        indexvisit="/"
        activepage="Shipping & Delivery"
        bgImg={bannerImg}
      />
      <section className="total-body py-5 d-block">
        <div className="intro_common_sec">
          <div className="container">
            <h2>Shipping and delivery</h2>
            <p>
              In accordance with the applicable laws in Abu Dhabi, UAE,
              customers must meet the legal drinking age requirement, which is
              at least 21 years old, to purchase alcoholic beverages. It is
              strictly prohibited for individuals under the age of 21 to attempt
              to purchase alcohol, regardless of whether the attempt is
              successful or not. For all shipments, deliveries, or store
              pickups, customers are required to be 21 years of age and must
              present valid identification to verify their age.
            </p>
            <p>
              There is no required minimum order amount for all customers inside
              Abu Dhabi island.
            </p>
            <p>
              There is a non-refundable AED 25 delivery charge for orders
              totaling less than AED 75.
            </p>
            <p>
              We offer both same-day and next-day delivery services exclusively
              to all areas within Abu Dhabi Island. For same-day delivery,
              please ensure your order is placed by 4 PM daily.
            </p>
            <p>
              Deliveries to Al Ruwais and Madinat Zayed (Zayed City) are
              scheduled every Thursday, if orders are placed by 12 PM on the
              preceding Wednesday. A minimum order value of 1000 is required for
              these locations.
            </p>
            <p>
              For deliveries to Al Ain, we operate every Tuesday for orders
              placed on Monday by 2 PM. A minimum order value of 1000 is
              applicable in this case.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
export default ShippingDelivery;
