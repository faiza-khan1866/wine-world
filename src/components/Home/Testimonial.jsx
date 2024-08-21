import React, { useState, useEffect, memo } from "react";
import { QueryCache } from "react-query";
import ReactStars from "react-rating-stars-component";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Aos from "aos";
import "aos/dist/aos.css";
import DataLoader from "../Loader/DataLoader";
import {
  fetchTestimonialsData,
  useFetchTestimonialsData,
} from "../../http/apiService";
import testimonialbg from "../../images/bgimages/testimonialbg.png";

const Testimonial = () => {
  const queryCache = new QueryCache();
  const { data: testimonialData, isLoading } =
    useFetchTestimonialsData(queryCache);
  const testimonialsList = testimonialData?.data?.testimonial || [];

  // const [testimonialsList, setTestimonialsList] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const fetchHomeTestimonialsData = async () => {
  //     try {
  //       setIsLoading(true); // Show the loader
  //       const { data } = await fetchTestimonialsData();
  //       setTestimonialsList(data?.testimonial);
  //     } catch (error) {
  //       console.error("Error fetching Data:", error);
  //     } finally {
  //       setIsLoading(false); // Hide the loader
  //     }
  //   };
  //   fetchHomeTestimonialsData();
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
    dots: true,
    arrows: false,
    infinite: true,
    margin: 30,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className="testimonal-sec pt-5 position-relative">
        <div className="container">
          <h6 className="text-center" data-aos="fade-down">
            Testimonials
          </h6>
          <h2 className="text-center" data-aos="fade-up">
            These Guys Love Us... So Will You!
          </h2>
          {isLoading ? (
            <DataLoader />
          ) : (
            <div className="silder-div-text mt-5 pb-5" data-aos="fade-down">
              <Slider {...settings}>
                {testimonialsList?.map((curElem) => (
                  <div
                    className="item d-inline-block w-100 m-auto"
                    key={curElem?.id}
                  >
                    <div className="insideu-div d-inline-block w-100">
                      <div className="comon-div-ts">
                        <h5
                          dangerouslySetInnerHTML={{
                            __html: curElem?.description,
                          }}
                        />
                        <ReactStars
                          count={5}
                          edit={false}
                          size={24}
                          isHalf={true}
                          value={curElem?.rating}
                          emptyIcon={<AiFillStar />}
                          halfIcon={<AiOutlineStar />}
                          fullIcon={<AiFillStar />}
                          activeColor="#d00035"
                          color="#e4e2e2"
                        />
                      </div>

                      <div className="d-flex mt-4 ">
                        <h4>
                          {curElem?.name}
                          <span className="d-block">
                            {curElem?.designation}
                          </span>
                        </h4>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          )}
        </div>

        <div className="tesimonial-sec-div">
          <figure>
            <img src={testimonialbg} alt="pic" />
          </figure>
        </div>
      </div>
    </>
  );
};
export default memo(Testimonial);
