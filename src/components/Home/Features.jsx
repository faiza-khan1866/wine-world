import React, { useState, useEffect, memo } from "react";
import { QueryCache } from "react-query";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Aos from "aos";
import "aos/dist/aos.css";
import DataLoader from "../Loader/DataLoader";
import {
  fetchFeaturedOnData,
  useFetchFeaturedOnData,
} from "../../http/apiService";

const Features = () => {
  const queryCache = new QueryCache();

  const { data: featuredOnList, isLoading } =
    useFetchFeaturedOnData(queryCache);
  const featuresData = featuredOnList?.data || [];

  // const [featuresData, setFeaturesData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const fetchFeaturedOnBrandsData = async () => {
  //     try {
  //       setIsLoading(true); // Show the loader

  //       const { data } = await fetchFeaturedOnData();
  // setFeaturesData(data);
  //     } catch (error) {
  //       console.error("Error fetching Data:", error);
  //     } finally {
  //       setIsLoading(false); // Hide the loader
  //     }
  //   };

  //   fetchFeaturedOnBrandsData();
  // }, []);

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
    dots: false,
    arrows: false,
    autoplay: true,
    infinite: true,
    autoplaySpeed: 3500,
    speed: 1500,
    margin: 30,
    slidesToShow: 6,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
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
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };
  return (
    <>
      <div className="brands-sec featured-sec py-3">
        <div className="container">
          <h2 className="text-center" data-aos="fade-up">
            Featured on
          </h2>
          {isLoading ? (
            <DataLoader />
          ) : (
            <div className="mt-3" data-aos="fade-down">
              <Slider {...settings}>
                {featuresData?.map((curElem) => {
                  const { id, logo } = curElem;
                  return (
                    <div className="item px-2" key={id}>
                      <img
                        src={process.env.REACT_APP_IMAGE_BASE_URL + logo}
                        alt="logo"
                        className="img-fluid"
                        loading="lazy"
                        width="130px"
                        height="90px"
                      />
                    </div>
                  );
                })}
              </Slider>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default memo(Features);
