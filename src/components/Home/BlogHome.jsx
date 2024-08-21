import React, { useState, useEffect, memo } from "react";
import { QueryCache } from "react-query";
import { NavLink } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaUser, FaTags } from "react-icons/fa";
import Aos from "aos";
import "aos/dist/aos.css";
import DataLoader from "../Loader/DataLoader";
import blog from "../../images/about/aboutpuresec.png";
import {
  fetchHomeBlogsData,
  useFetchHomeBlogsDataData,
} from "../../http/apiService";

const BlogHome = () => {
  const queryCache = new QueryCache();
  const { data: homeBlogData, isLoading } =
    useFetchHomeBlogsDataData(queryCache);
  const blogsList = homeBlogData?.data?.blogs || [];

  // const [blogsList, setBlogsList] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const fetchHomeBlogsList = async () => {
  //     try {
  //       setIsLoading(true); // Show the loader

  //       const { data } = await fetchHomeBlogsData();
  //       setBlogsList(data?.blogs);
  //     } catch (error) {
  //       console.error("Error fetching Data:", error);
  //     } finally {
  //       setIsLoading(false); // Hide the loader
  //     }
  //   };

  //   fetchHomeBlogsList();
  // }, []);

  const date = {
    day: "numeric",
  };
  const month = {
    month: "long",
  };
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
      <div className="news-sec-div py-5">
        <div className="container">
          <h6 className="text-center" data-aos="fade-down">
     Spirited Stories
            {/* News & Articles */}
          </h6>
          <h2 className="text-center" data-aos="fade-up">
            Our Latest Blogs
          </h2>
          {isLoading ? (
            <DataLoader />
          ) : (
            <div className="news-sec-div-part mt-5" data-aos="fade-down">
              <Slider {...settings}>
                {blogsList?.map((curElem) => (
                  <div className="item" key={curElem?.id}>
                    <div className="comon-news-part">
                      <div className="comon-pic-news">
                        <figure className="position-relative">
                          <NavLink
                            to={`/blog/${curElem?.category?.route}/${curElem?.route}`}
                          >
                            <img
                              src={
                                curElem?.featured_img
                                  ? process.env.REACT_APP_IMAGE_BASE_URL +
                                    curElem?.featured_img
                                  : blog
                              }
                              alt="picb"
                            />
                          </NavLink>
                        </figure>
                        <div className="date-text">
                          {new Date(curElem?.created_at)?.toLocaleDateString(
                            "en-US",
                            date
                          )}
                          <span className="d-block">
                            {new Date(curElem?.created_at)?.toLocaleDateString(
                              "en-US",
                              month
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="dtails-idv-text">
                        <ul className="list-unstyled d-flex">
                          <li>
                            <FaUser /> {curElem?.created_by}
                          </li>
                          {curElem?.category?.name && (
                            <li>
                              <FaTags />
                              {curElem?.category?.name}
                            </li>
                          )}
                        </ul>
                        <h5> {curElem?.title} </h5>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: curElem?.short_description,
                          }}
                        />
                        <NavLink
                          to={`/blog/${curElem?.category?.route}/${curElem?.route}`}
                          className="btn read-more-bn"
                        >
                          Read more
                        </NavLink>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default memo(BlogHome);
