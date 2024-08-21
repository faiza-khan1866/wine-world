import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const NewsDetails = ({ newsData }) => {
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
      <div className="news_detail_sec py-5">
        <div className="container">
          <div className="news_details">
            <h2 className="text-center" data-aos="fade-down">
              {newsData?.title}
            </h2>
            <p
              dangerouslySetInnerHTML={{
                __html: newsData?.long_description,
              }}
              data-aos="fade-up"
            />
            {newsData?.main_img && (
              <figure>
                <img
                  src={
                    process.env.REACT_APP_IMAGE_BASE_URL + newsData?.main_img
                  }
                  alt="news"
                  className="image"
                />
              </figure>
            )}
          </div>
          {newsData?.logos_and_links?.[0]?.link !== null && (
            <div className="news_list">
              {newsData?.logos_and_links?.map((x, i) => (
                <div
                  className="news_item"
                  key={i}
                  onClick={() => window.open(x?.link)}
                >
                  <span>{x?.title}</span>
                  <img
                    src={process.env.REACT_APP_IMAGE_BASE_URL + x?.logo}
                    alt="logo"
                    className="img-fluid"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default NewsDetails;
