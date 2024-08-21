import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import payment from "../images/logo/payment.png";
import appStore from "../images/icons/app-store.jpg";
import googleStore from "../images/icons/google-play.jpg";
import { toast } from "react-toastify";
import { createSubscribeData } from "../http/apiService";
import info from "../dbs/info.json";
const initailObject = {
  email: "",
};

const Footer = () => {
  const user_type = useSelector((state) => state.user.User_Data.user_type);
  const isUserLogIn = useSelector((state) => state.user.isUser);
  const [formValues, setFormValues] = useState(initailObject);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const fetchSubscribeFormData = async (updatedData) => {
    try {
      const response = await createSubscribeData(updatedData);
      if (response.status === 200 || response.status === 201) {
        setLoading(false);
        toast.success("Subscribed Successfully!", {
          autoClose: 3000,
          theme: "dark",
        });
        setFormValues({ ...initailObject });
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

    if (formValues?.email === "") {
      toast.warn("Please Enter Email.", {
        autoClose: 3000,
        theme: "dark",
      });
      return false;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues?.email)
    ) {
      toast.warn("Invalid email address..", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }

    let updatedData = { ...formValues };
    setLoading(true);
    fetchSubscribeFormData(updatedData);
  };

  const handleLoginProfile = () => {
    toast.warn("Please Login First.", {
      autoClose: 3000,
      theme: "dark",
    });
  };
  return (
    <>
      <footer className="pt-5">
        <div className="container">
          <div className="row gy-5">
            <div className="col-lg-3 col-md-6 col-12">
              <div className="comon-footer">
                <h5> Contact Us </h5>
                <ul className="list-unstyled">
                  <li>
                    <b> WareHouse: </b>{" "}
                    <a href={info?.map_link} target="__blank">
                      {info?.address}
                    </a>
                  </li>
                  <li>
                    <b> Store Address: </b>{" "}
                    <a href={info?.store_map_link} target="__blank">
                      {info?.store_address}
                    </a>
                  </li>
                  <li>
                    <b> Tel: </b>{" "}
                    <a href={`tel:${info?.phone_link}`}>{info?.phone}</a>
                  </li>
                  <li>
                    <b> Email: </b>{" "}
                    <a href={`mailto:${info?.email}}`}>{info?.email}</a>
                  </li>
                </ul>

                <ul className="list-unstyled socialIcons">
                  <li>
                    <a
                      href="https://www.facebook.com/RoyalSpirit.AE"
                      target="_blank"
                      aria-label="social-media-link"
                      rel="nofollow"
                    >
                      <FaFacebookF className="icon-style" />
                    </a>
                    <a
                      href="https://www.instagram.com/royalspirit.ae/"
                      target="_blank"
                      aria-label="social-media-link"
                      rel="nofollow"
                    >
                      <FaInstagram className="icon-style" />
                    </a>
                    <a
                      href="https://wa.me/+971569812858"
                      target="_blank"
                      aria-label="social-media-link"
                      rel="nofollow"
                    >
                      <FaWhatsapp className="icon-style" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-2 col-md-6 col-6">
              <div className="comon-footer justify-content-lg-center d-grid">
                <h5> About Us </h5>
                <ul className="list-unstyled">
                  <li>
                    <NavLink to="/">Home</NavLink>
                  </li>
                  <li>
                    <NavLink to="/about">About Us</NavLink>
                  </li>
                  <li>
                    <NavLink to="/corporate">Corporate</NavLink>
                  </li>
                  <li>
                    <NavLink to="/news">News</NavLink>
                  </li>
                  <li>
                    {/* <NavLink to="/blog"> Blog </NavLink> */}
                    Blog
                  </li>
                  <li>
                    <NavLink to="/faq">FAQ</NavLink>
                  </li>
                  {/* <li>
                    <NavLink to="/gift"> Gift </NavLink>
                  </li> */}
                  <li>
                    <NavLink to="/contact">Contact</NavLink>
                  </li>
                  {/* <li>
                    <NavLink to="/"> Careers </NavLink>
                  </li> */}
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-4 col-6">
              <div className="comon-footer justify-content-lg-center d-grid">
                <h5> Customer Services </h5>
                <ul className="list-unstyled">
                  {user_type !== "corporate" && (
                    <li>
                      {isUserLogIn ? (
                        <NavLink to="/account/orders">My Orders</NavLink>
                      ) : (
                        <span
                          onClick={handleLoginProfile}
                          style={{ cursor: "pointer" }}
                        >
                          My Orders
                        </span>
                      )}
                    </li>
                  )}
                  {/* {user_type !== "corporate" && (
                    <li>
                      {isUserLogIn ? (
                        <NavLink to="/">Track Your Order</NavLink>
                      ) : (
                        <span
                          onClick={handleLoginProfile}
                          style={{ cursor: "pointer" }}
                        >
                          Track Your Order
                        </span>
                      )}
                    </li>
                  )} */}
                  <li>
                    <NavLink to="/return-refund">Return & Refund</NavLink>
                  </li>
                  <li>
                    <NavLink to="/shipping-delivery">
                      Shipping & Delivery
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/privacy-policy">Privacy Policy</NavLink>
                  </li>
                  <li>
                    <NavLink to="/terms-conditions">Terms & Conditions</NavLink>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-4 col-md-8 col-12 order-first order-lg-last order-md-last">
              <div className="comon-footer justify-content-lg-center d-grid">
                <h5> Get exclusive offers & rewards </h5>
                <ul className="list-unstyled">
                  <li>
                    Sign up for our members portal to receive some exclusive
                    offers & rewards. It's easy and free!
                  </li>
                </ul>
                <div className="d-flex align-items-center justify-content-start subscriber-wraper">
                  <Form>
                    <Form.Group controlId="email">
                      <Form.Control
                        type="email"
                        name="email"
                        value={formValues.email}
                        onChange={handleInputChange}
                        placeholder="Email Address"
                      />
                    </Form.Group>
                  </Form>
                  <Button
                    className="btn subscribe-btn borderRadius_1"
                    onClick={handleSubmit}
                    disabled={loading ? true : false}
                  >
                    {loading ? "Sending..." : "Subscribe"}
                  </Button>
                </div>
                <div className="d-flex align-items-center justify-content-start mt-4 app_icons">
                  <a
                    href="https://apps.apple.com/app/royalspirit/id6475167410"
                    target="_blank"
                    rel="nofollow"
                  >
                    <img
                      src={appStore}
                      className="img-fluid"
                      width={130}
                      height={43}
                      alt="appStore"
                    />
                  </a>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.prismDigital.royalsprit"
                    target="_blank"
                    rel="nofollow"
                  >
                    <img
                      src={googleStore}
                      className="img-fluid ms-3"
                      width={130}
                      height={43}
                      alt="googleStore"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <center>
            <hr className="space_line" />
          </center>
          <div className="d-flex justify-content-between align-items-center py-4 copyright-wraper">
            <p className="copyright-text">
              Copyright © 2022 <a href="/">Royal Spirit.</a> All rights
              reserved.
            </p>
            <p className="copyright-text">
              Designed And Managed By{" "}
              <a href="https://www.prism-me.com/" target="_blank">
                Prism Digital
              </a>
            </p>
            <p className="copyright-text text-white">
              <span>WE ACCEPT</span>{" "}
              <img src={payment} alt="payment" width={230} height={28} />
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Footer;
