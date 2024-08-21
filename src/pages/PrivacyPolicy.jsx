import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import SubpageBanner from "../components/common/SubpageBanner";
import bannerImg from "../images/banners/privacypolicybanner.png";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Royal Spirit</title>
        <meta name="description" content="Privacy Policy" />
        <link rel="canonical" href="https://royalspirit.ae/privacy-policy" />
      </Helmet>
      <SubpageBanner
        name="Privacy Policy"
        indexpage="Home"
        indexvisit="/"
        activepage="Privacy Policy"
        bgImg={bannerImg}
      />
      <section className="total-body py-5 d-block">
        <div className="intro_common_sec">
          <div className="container">
            <h2>**Privacy policy</h2>
            <p>
              *Effective Date: September 2023* - Last Updated: September 2023
            </p>
            <h3>Introduction*</h3>
            <p>
              Welcome to Royal Spirit Liquor. We are committed to protecting
              your privacy and ensuring the security of your personal
              information. This Privacy Policy outlines how we collect, use,
              disclose, and protect your data when you use our website.
            </p>
            <h3>Information We Collect*</h3>
            <ul>
              <li>
                *Account Information:* When you create an account on our
                website, we collect personal information, including your name,
                email address, date of birth, and password.
              </li>
              <li>
                *Profile Information:* You may choose to provide additional
                information in your user account profile, such as your location,
                preferences, and your age.
              </li>
            </ul>
            <h3>How We Use Your Information*</h3>
            <ul>
              <li>
                *Account Management:* We use your information to manage your
                user account, provide personalized services, and verify your age
                for legal compliance.
              </li>
              <li>
                *Communication:* We may send you transactional emails, service
                updates, and marketing communications based on your preferences.
              </li>
              <li>
                *Improvement of Services:* We use data to analyze user behavior
                and improve our website, products, and services.
              </li>
            </ul>
            <h3>Data Sharing*</h3>
            <ul>
              <li>
                *Third-Party Service Providers:* We may share your information
                with trusted third-party service providers to assist with
                payment processing, shipping, and other website-related
                functions.
              </li>
              <li>
                *Legal Compliance:* We may disclose your information to comply
                with applicable laws, regulations, or legal processes.
              </li>
            </ul>
            <h3>Security Measures*</h3>
            <p>
              We implement industry-standard security measures to protect your
              data, including encryption, firewalls, and access controls.
            </p>
            <h3>Cookies and Tracking Technologies*</h3>
            <p>
              Our website may use cookies and tracking technologies to enhance
              your experience. You can manage your cookie preferences in your
              account settings.
            </p>
            <h3>User Rights*</h3>
            <ul>
              <li>
                *Access and Correction:* You can access and update your account
                information at any time.
              </li>
              <li>
                *Data Deletion:* You have the right to request the deletion of
                your account and associated data.
              </li>
            </ul>

            <h3>Data Retention*</h3>
            <p>
              We retain your data for as long as necessary to fulfill the
              purposes outlined in this policy, unless a longer retention period
              is required by law.
            </p>
            <h3>Legal Compliance*</h3>
            <p>
              We comply with all applicable data protection laws. If you have
              concerns or questions regarding your data, please contact us at{" "}
              <a href="mailto:admin@royalspirit.ae">admin@royalspirit.ae</a>
            </p>
            <h3>Updates to Privacy Policy*</h3>
            <p>
              We may update this Privacy Policy as our practices evolve. We will
              notify you of any significant changes via email or a notice on our
              website.
            </p>
            <h3>User Consent*</h3>
            <p>
              By creating an account and using our services, you consent to the
              terms outlined in this Privacy Policy.
            </p>
            <h3>Contact Information*</h3>
            <p>
              If you have any questions or concerns about this Privacy Policy,
              please contact us at:{" "}
              <a href="mailto:admin@royalspirit.ae">admin@royalspirit.ae</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
export default PrivacyPolicy;
