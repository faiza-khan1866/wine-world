import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import SubpageBanner from "../components/common/SubpageBanner";
import bannerImg from "../images/banners/termsconditionsbanner.png";

const TermsConditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Helmet>
        <title>Terms & Conditions | Royal Spirit</title>
        <meta name="description" content="Terms & Conditions" />
        <link rel="canonical" href="https://royalspirit.ae/terms-conditions" />
      </Helmet>
      <SubpageBanner
        name="Terms & Conditions"
        indexpage="Home"
        indexvisit="/"
        activepage="Terms & Conditions"
        bgImg={bannerImg}
      />
      <section className="total-body py-5 d-block">
        <div className="intro_common_sec">
          <div className="container">
            <h2>**Terms and conditions</h2>
            <p>Effective Date: September 2023 - Last Updated: September 2023</p>
            <h3>Acceptance of Terms*</h3>
            <p>
              By using{" "}
              <a href="https://royalspirit.ae/" target="_blank">
                royalspirit.ae
              </a>
              , you agree to abide by these Terms and Conditions.
            </p>
            <h3>Eligibility*</h3>
            <p>
              You must be of legal drinking age in your jurisdiction to use this
              website.
            </p>
            <h3>User Accounts*</h3>
            <ul>
              <li>
                You are responsible for maintaining the confidentiality of your
                account information, including your username and password.
              </li>
              <li>
                You agree to provide accurate and up-to-date information when
                creating an account.
              </li>
            </ul>
            <h3>Purchase of Alcoholic Beverages*</h3>
            <ul>
              <li>
                Alcohol Sales: We sell alcoholic beverages and may require age
                verification before purchase.
              </li>
              <li>
                Compliance: You agree to comply with all local, state, and
                federal laws regarding the purchase and consumption of alcohol.
              </li>
            </ul>
            <h3>Use of the Website*</h3>
            <ul>
              <li>
                Prohibited Activities: You may not use the website for any
                illegal or unauthorized purposes.
              </li>
              <li>
                Content Ownership: All content on the website, including text,
                images, and trademarks, is the property of [Royal Spirit].
              </li>
            </ul>
            <h3>Privacy Policy*</h3>
            <p>
              Our Privacy Policy outlines how we collect, use, and protect your
              personal information. By using the website, you agree to our
              Privacy Policy.
            </p>
            <h3>Liability and Disclaimers*</h3>
            <p>
              We are not responsible for any damages or losses resulting from
              the use of our website or the consumption of products purchased
              through the website.
            </p>
            <h3>Changes to Terms and Conditions*</h3>
            <p>
              We reserve the right to update these Terms and Conditions at any
              time. Continued use of the website constitutes acceptance of the
              updated terms.
            </p>
            <h3>Termination*</h3>
            <p>
              We reserve the right to terminate or suspend your account and
              access to the website for violations of these Terms and
              Conditions.
            </p>
            <h3>Governing Law*</h3>
            <p>
              These Terms and Conditions are governed by the laws of Abu Dhabi
              UAE
            </p>
            <h3>Contact Information*</h3>
            <p>
              If you have questions or concerns regarding these Terms and
              Conditions, please contact us at{" "}
              <a href="mailto:admin@royalspirit.ae">admin@royalspirit.ae</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
export default TermsConditions;
