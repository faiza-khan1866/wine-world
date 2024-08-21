import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import smallpicone from "../../images/109076-cypruswine-Cyprus-Maratheftiko-Shiraz-wine-748x549.jpg";
import smallpictwo from "../../images/navbharat-times.jpg";
import Aos from "aos";
import "aos/dist/aos.css";

const CorporateOffer = () => {
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
      <div className="top-offer-div-sec ">
        <div className="container">
          <div className="row row-cols-1 row-cols-md-2 gy-4 gy-lg-0 gx-lg-4">
            <div className="col" data-aos="fade-up">
              <NavLink
                to="/shop/beer"
                className="comon-offer"
                style={{ height: "270px" }}
              >
                <figure style={{ height: "270px" }}>
                  <img src={smallpicone} alt="bg" />
                </figure>
                <h5 className="col-lg-11 m-auto text-center">
                  <span className="d-block">20% Coupon Lorem Ipsum</span>
                  Corporate Gifting
                </h5>
              </NavLink>
            </div>
            <div className="col" data-aos="fade-down">
              <NavLink
                to="/shop/beer"
                className="comon-offer"
                style={{ height: "270px" }}
              >
                <figure style={{ height: "270px" }}>
                  <img src={smallpictwo} alt="bg" />
                </figure>
                <h5 className="col-lg-11 m-auto text-center">
                  <span className="d-block">20% Coupon Lorem Ipsum</span>
                  Corporate Events
                </h5>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CorporateOffer;
