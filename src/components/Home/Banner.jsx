import React, { useEffect } from "react";
import Bannerpicone from "../../images/banner2.jpg";
import Aos from "aos";
import "aos/dist/aos.css";
const Banner = () => {
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
    <div className="banner-part" style={{ background: `url(${Bannerpicone})` }}>
      <div className="container">
        <div className="row justify-content-end">
          <div className="col-lg-6 col-md-8 col-sm-10 col-12">
            <div className="banner-content" data-aos="fade-down">
              <h4> Taste our </h4>
              <h2>
                Contrary Popular
                <span className="d-block"> Vintage Wine </span>
              </h2>
              <p>
                It is a long lorem Ipsum is simply dummy text of the printing
                and typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text.
              </p>
              <form className="banner-form" data-aos="fade-up">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Your Location"
                />
                <input
                  type="submit"
                  className="btn banner-btn"
                  value="Send a Gift"
                />
                <span>or</span>
                <input
                  type="submit"
                  className="btn banner-btn"
                  value="Delivery"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Banner;
