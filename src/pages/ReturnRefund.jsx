import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import SubpageBanner from "../components/common/SubpageBanner";
import bannerImg from "../images/banners/returnrefundbanner.png";

const ReturnRefund = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Helmet>
        <title>Return & Refund Policy | Royal Spirit</title>
        <meta name="description" content="Return & Refund Policy" />
        <link rel="canonical" href="https://royalspirit.ae/return-refund" />
      </Helmet>
      <SubpageBanner
        name="Return & Refund Policy"
        indexpage="Home"
        indexvisit="/"
        activepage="Return & Refund Policy"
        bgImg={bannerImg}
      />
      <section className="total-body py-5 d-block">
        <div className="intro_common_sec">
          <div className="container">
            <h2>Return and refund policy</h2>
            <h3>Return Eligibility:</h3>
            <p>
              We accept returns for items that are damaged, defective, or not as
              described. If you receive a product that falls under any of these
              categories, please contact our Customer Service team within 48
              hours of receiving the order.
            </p>
            <h3>Return Procedure:</h3>
            <p>To initiate a return, please follow these steps:</p>
            <ul>
              <li>
                Contact our Customer Service team via email or phone within 48
                hours of receiving the order.
              </li>
              <li>
                Provide your order number, the details of the issue, and any
                supporting photos if applicable.
              </li>
              <li>
                Our team will review your request and guide you through the
                return process.
              </li>
            </ul>
            <h3>Return Conditions:</h3>
            <ul>
              <li>
                Items must be in their original packaging and unused condition.
              </li>
              <li>
                All labels, seals, and tags should be intact and not tampered
                with.
              </li>
              <li>
                Returns are subject to inspection and approval by our team.
              </li>
            </ul>
            <h3>Refund Process:</h3>
            <p>
              Once the returned item is received and inspected, we will notify
              you of the approval or rejection of your refund.:
            </p>
            <ul>
              <li>
                If approved, a refund will be processed to the original method
                of payment within a certain number of days, as per your bank's
                processing timeline.
              </li>
              <li>
                Shipping costs are non-refundable unless the return is due to an
                error on our part.
              </li>
            </ul>
            <h3>Exchanges:</h3>
            <p>
              We do not offer direct exchanges. If you wish to exchange an item,
              you can return the unwanted item following the return procedure
              and place a new order for the desired item.
            </p>
            <h3>Cancellations:</h3>
            <p>
              If you need to cancel an order, please contact us as soon as
              possible. Cancellations are subject to our approval and depend on
              the status of your order.
            </p>
            <h3>Contact Us:</h3>
            <p>
              If you have any questions or concerns about our return and refund
              policy, please contact our Customer Service team at{" "}
              <a href="mailto:hello@royalspirit.ae">hello@royalspirit.ae</a> or
              call us at <a href="tel:+971501119486">+971 50 111 9486</a>.
            </p>
            <p>
              Please note that our return and refund policy is subject to
              change, and any updates will be posted on our website. We are
              dedicated to ensuring a smooth and satisfactory shopping
              experience for all our valued customers.
            </p>
            <p>Last updated: September 2023</p>
          </div>
        </div>
      </section>
    </>
  );
};
export default ReturnRefund;
