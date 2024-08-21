import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BrandsData from "../apidata/BrandsApi";
import Aos from "aos";
import "aos/dist/aos.css";

const Brands = () => {
  const [workData, setworkData] = useState(BrandsData);

  useEffect(() => {
    Aos.init({
      offset: 100,
      easing: "ease",
      delay: 0,
      once: true,
      duration: 800,
    });
  });

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    margin: 30,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  return (
    <>
      <div className="brands-sec pt-5">
        <div className="container">
          <h2 className="text-center" data-aos="fade-up">
            Our Brands
          </h2>
          <div className="my-5" data-aos="fade-down">
            <Slider {...settings}>
              {workData.map((curElem) => {
                const { id, brand_logo } = curElem;
                return (
                  <div className="item mb-2" key={id}>
                    <img
                      src={brand_logo}
                      alt="brand logo"
                      className="img-fluid"
                      loading="lazy"
                    />
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};
export default Brands;
