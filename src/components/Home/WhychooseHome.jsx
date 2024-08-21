import React, { useEffect } from "react";
import iconone from "../../images/3401521.png";
import icontwo from "../../images/2872086.png";
import iconthree from "../../images/2727975.png";
import featuredmiddleimg from "../../images/bgimages/featuredmiddleimg.webp";
import iconfive from "../../images/5699771.png";
import iconsix from "../../images/4208408.png";
import iconseven from "../../images/2197366.png";
import Aos from "aos";
import "aos/dist/aos.css";
import HomeApi from "../apidata/HomeApi";

const WhychooseHome = () => {
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
      <div className="choose-bread py-5">
        <div className="container">
          <h6 className="text-center" data-aos="fade-down">
            100% natural
          </h6>
          <h2 className="text-center" data-aos="fade-up">
            {HomeApi?.whyChoose?.title}
          </h2>
          <div className="row mt-5">
            <div className="col-lg-3 order-2 order-lg-1 mt-5 mt-lg-0">
              <div className="comon-special" data-aos="fade-up">
                <div className="d-flex justify-content-between">
                  <div className="col-4 col-sm-3 col-md-2 col-lg-4 col-xl-4">
                    <figure className="icon-sp">
                      <img src={iconone} alt="bnerpic" loading="lazy" />
                    </figure>
                  </div>
                  <div className="col-8 col-sm-9 col-md-10 col-lg-7 col-xl-8">
                    <h5>{HomeApi?.whyChoose?.feature1?.title}</h5>
                    <p>{HomeApi?.whyChoose?.feature1?.detail}</p>
                  </div>
                </div>
              </div>

              <div className="comon-special" data-aos="fade-down">
                <div className="d-flex justify-content-between">
                  <div className="col-4 col-sm-3 col-md-2 col-lg-4 col-xl-4">
                    <figure className="icon-sp">
                      <img src={icontwo} alt="bnerpic" loading="lazy" />
                    </figure>
                  </div>
                  <div className="col-8 col-sm-9 col-md-10 col-lg-7 col-xl-8">
                    <h5>{HomeApi?.whyChoose?.feature2?.title}</h5>
                    <p>{HomeApi?.whyChoose?.feature2?.detail}</p>
                  </div>
                </div>
              </div>

              <div className="comon-special" data-aos="fade-up">
                <div className="d-flex justify-content-between">
                  <div className="col-4 col-sm-3 col-md-2 col-lg-4 col-xl-4">
                    <figure className="icon-sp">
                      <img src={iconthree} alt="bnerpic" loading="lazy" />
                    </figure>
                  </div>
                  <div className="col-8 col-sm-9 col-md-10 col-lg-7 col-xl-8">
                    <h5>{HomeApi?.whyChoose?.feature3?.title}</h5>
                    <p>{HomeApi?.whyChoose?.feature3?.detail}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 order-1 order-lg-2" data-aos="fade-up">
              <figure className="middle-big-pic">
                <img src={featuredmiddleimg} alt="wine" loading="lazy" />
              </figure>
            </div>

            <div className="col-lg-3 order-3 order-lg-3">
              <div className="comon-special" data-aos="fade-down">
                <div className="d-flex justify-content-between">
                  <div className="col-4 col-sm-3 col-md-2 col-lg-4 col-xl-4">
                    <figure className="icon-sp">
                      <img src={iconfive} alt="bnerpic" loading="lazy" />
                    </figure>
                  </div>
                  <div className="col-8 col-sm-9 col-md-10 col-lg-7 col-xl-8">
                    <h5>{HomeApi?.whyChoose?.feature4?.title}</h5>
                    <p>{HomeApi?.whyChoose?.feature4?.detail}</p>
                  </div>
                </div>
              </div>

              <div className="comon-special" data-aos="fade-up">
                <div className="d-flex justify-content-between">
                  <div className="col-4 col-sm-3 col-md-2 col-lg-4 col-xl-4">
                    <figure className="icon-sp">
                      <img src={iconsix} alt="bnerpic" loading="lazy" />
                    </figure>
                  </div>
                  <div className="col-8 col-sm-9 col-md-10 col-lg-7 col-xl-8">
                    <h5>{HomeApi?.whyChoose?.feature5?.title}</h5>
                    <p>{HomeApi?.whyChoose?.feature5?.detail}</p>
                  </div>
                </div>
              </div>

              <div className="comon-special" data-aos="fade-up">
                <div className="d-flex justify-content-between">
                  <div className="col-4 col-sm-3 col-md-2 col-lg-4 col-xl-4">
                    <figure className="icon-sp">
                      <img src={iconseven} alt="bnerpic" loading="lazy" />
                    </figure>
                  </div>
                  <div className="col-8 col-sm-9 col-md-10 col-lg-7 col-xl-8">
                    <h5>{HomeApi?.whyChoose?.feature6?.title}</h5>
                    <p>{HomeApi?.whyChoose?.feature6?.detail}</p>
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
export default WhychooseHome;
