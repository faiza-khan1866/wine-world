import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { NavLink } from "react-router-dom";

const AboutOffer = () => {
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
      <div className="about-offer-section py-5">
        <div className="container">
          <div data-aos="fade-up">
            <h2 className="text-white text-center">Exclusive offerings</h2>
            <p className="text-white text-center col-lg-7 m-auto my-3">
              Handpicked Selections for the Connoisseur in You
            </p>
            <p className="text-white text-center col-lg-7 m-auto">
              Our extensive selection spans globally renowned brands to hidden
              gems, ensuring we have something that will delight your palate
              irrespective of whether you're looking for a familiar favorite or
              a new adventure
            </p>
            <NavLink
              to="/shop/beer"
              className="btn shop-bn-ab mx-auto mt-3 d-table borderRadius_1"
            >
              Shop Now
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};
export default AboutOffer;
