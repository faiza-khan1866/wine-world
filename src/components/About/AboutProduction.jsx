import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { NavLink } from "react-router-dom";
import aboutpuresec from "../../images/about/aboutus-02.jpg";
import { FaCheckCircle } from "react-icons/fa";

const AboutProduction = () => {
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
      <div className="about-poroduction-section py-5 sub-pages">
        <div className="container">
          <div className="row row-cols-1 row-cols-lg-2 gx-lg-5 gy-4 gy-lg-0">
            <div className="col">
              {/* <h6 data-aos="fade-up"> Winery Offers </h6> */}
              <div data-aos="fade-down">
                <h2>Pure. Premium. Perfect.</h2>
                <p className="mt-3">
                  In the world of liquors, purity is paramount. At Royal Spirit,
                  we take immense pride in offering a range of beverages,
                  crafted with respect for nature and tradition. Our commitment
                  extends beyond wines, encompassing spirits and beers alike.
                </p>
                <ul className="cstList">
                  <li>Chosen with care</li>
                  <li>A celebration of nature's finest ingredients</li>
                </ul>
                <NavLink
                  to="/shop/beer"
                  className="btn shop-bn-ab mt-3 borderRadius_1"
                >
                  Shop Now
                </NavLink>
              </div>
            </div>
            <div className="col">
              <figure data-aos="fade-up">
                <img src={aboutpuresec} alt="banner" />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AboutProduction;
