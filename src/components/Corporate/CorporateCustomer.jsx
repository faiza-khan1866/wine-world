import React, { useEffect } from "react";
import iconone from "../../images/3401521.png";
import icontwo from "../../images/2872086.png";
import iconthree from "../../images/2727975.png";
import corporateCustomerImg from "../../images/bgimages/corporateCustomerImg.png";
import iconfive from "../../images/5699771.png";
import iconsix from "../../images/4208408.png";
import iconseven from "../../images/2197366.png";
import Aos from "aos";
import "aos/dist/aos.css";

const CorporateCustomer = () => {
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
      <div className="choose-bread">
        <div className="container">
          <h2 className="text-center" data-aos="fade-up">
            Six reasons to become Royal Spirit's corporate preferred customer
          </h2>
          <div className="row mt-5">
            <div className="col-lg-3 order-2 order-lg-1 mt-5 mt-lg-0">
              <div className="comon-special" data-aos="fade-up">
                <div className="d-flex justify-content-between">
                  <div className="col-4 col-sm-3 col-md-2 col-lg-4 col-xl-4">
                    <figure className="icon-sp">
                      <img src={iconone} alt="bnerpic" />
                    </figure>
                  </div>
                  <div className="col-8 col-sm-9 col-md-10 col-lg-7 col-xl-8">
                    <h5>Preferential Pricing</h5>
                    <p>
                      Exclusive pricing tailored for our esteemed corporate
                      partners. Experience luxury that's both accessible and
                      affordable.
                    </p>
                  </div>
                </div>
              </div>

              <div className="comon-special" data-aos="fade-down">
                <div className="d-flex justify-content-between">
                  <div className="col-4 col-sm-3 col-md-2 col-lg-4 col-xl-4">
                    <figure className="icon-sp">
                      <img src={icontwo} alt="bnerpic" />
                    </figure>
                  </div>
                  <div className="col-8 col-sm-9 col-md-10 col-lg-7 col-xl-8">
                    <h5>Customized Solution</h5>
                    <p>
                      Your business is unique, and so should be your liquor
                      selection. We work closely with you to craft a bespoke
                      offering that aligns seamlessly with your needs.
                    </p>
                  </div>
                </div>
              </div>

              <div className="comon-special" data-aos="fade-up">
                <div className="d-flex justify-content-between">
                  <div className="col-4 col-sm-3 col-md-2 col-lg-4 col-xl-4">
                    <figure className="icon-sp">
                      <img src={iconthree} alt="bnerpic" />
                    </figure>
                  </div>
                  <div className="col-8 col-sm-9 col-md-10 col-lg-7 col-xl-8">
                    <h5>Preferred Delivery</h5>
                    <p>
                      Place your order and choose a convenient time for
                      delivery. We ensure timely delivery within the capital of
                      UAE, bringing Royal Spirit's excellence right to your
                      doorstep.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 order-1 order-lg-2" data-aos="fade-up">
              <figure className="middle-big-pic">
                <img src={corporateCustomerImg} alt="wine" />
              </figure>
            </div>

            <div className="col-lg-3 order-3 order-lg-3">
              <div className="comon-special" data-aos="fade-down">
                <div className="d-flex justify-content-between">
                  <div className="col-4 col-sm-3 col-md-2 col-lg-4 col-xl-4">
                    <figure className="icon-sp">
                      <img src={iconfive} alt="bnerpic" />
                    </figure>
                  </div>
                  <div className="col-8 col-sm-9 col-md-10 col-lg-7 col-xl-8">
                    <h5>Wide Selection of International Brands.</h5>
                    <p>
                      A world of premium choices awaits. From globally
                      celebrated brands to exclusive rarities, our portfolio is
                      a treasure trove of fine liquors.
                    </p>
                  </div>
                </div>
              </div>

              <div className="comon-special" data-aos="fade-up">
                <div className="d-flex justify-content-between">
                  <div className="col-4 col-sm-3 col-md-2 col-lg-4 col-xl-4">
                    <figure className="icon-sp">
                      <img src={iconsix} alt="bnerpic" />
                    </figure>
                  </div>
                  <div className="col-8 col-sm-9 col-md-10 col-lg-7 col-xl-8">
                    <h5>Bulk Rates</h5>
                    <p>
                      Exclusive Designs at Special Prices. Tailored to your
                      needs, our bulk orders come with bespoke designs and
                      attractive rates, ensuring you receive unparalleled value
                    </p>
                  </div>
                </div>
              </div>

              <div className="comon-special" data-aos="fade-up">
                <div className="d-flex justify-content-between">
                  <div className="col-4 col-sm-3 col-md-2 col-lg-4 col-xl-4">
                    <figure className="icon-sp">
                      <img src={iconseven} alt="bnerpic" />
                    </figure>
                  </div>
                  <div className="col-8 col-sm-9 col-md-10 col-lg-7 col-xl-8">
                    <h5>Personalized Service</h5>
                    <p>
                      More than just service, it's a Royal Spirit experience.
                      Every interaction is tailored to ensure your utmost
                      satisfaction.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CorporateCustomer;
