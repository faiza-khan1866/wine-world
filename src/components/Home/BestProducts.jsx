import React, { useEffect, memo } from "react";
import { QueryCache } from "react-query";
import product from "../../images/products/product.webp";
import { NavLink, useNavigate } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import DataLoader from "../Loader/DataLoader";
import { useFetchOurChoicesProductsData } from "../../http/apiService";

const BestProducts = () => {
  const navigate = useNavigate();
  const queryCache = new QueryCache();
  const { data: bestSellingData, isLoading } =
    useFetchOurChoicesProductsData(queryCache);

  const options = {
    margin: 30,
    responsiveClass: true,
    nav: true,
    dots: false,
    autoplay: false,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      600: {
        items: 2,
      },
      700: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
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
  return (
    <>
      <div className="Prodcuts-div py-5">
        <div className="container">
          <h6 className="text-center" data-aos="fade-down">
            Try Royal Spirit choice
          </h6>
          <h2
            className="text-center text-white comon-heading"
            data-aos="fade-up"
          >
            Don't know what to choose?
          </h2>
          <div className="products-slide mt-4">
            <div className="filter-container">
              {isLoading ? (
                <DataLoader />
              ) : (
                <OwlCarousel className="owl-theme" {...options}>
                  {!bestSellingData?.data?.length
                    ? null
                    : bestSellingData?.data?.map((curElem, i) => (
                        <div data-aos="fade-down" key={i}>
                          <div
                            className="produc-div"
                            style={{ minHeight: "350px" }}
                          >
                            <div className="products-box">
                              <figure
                                onClick={() =>
                                  navigate(`/our-choice/${curElem?.route}`)
                                }
                              >
                                <img
                                  src={
                                    curElem?.featured_img
                                      ? process.env.REACT_APP_IMAGE_BASE_URL +
                                        curElem?.featured_img
                                      : product
                                  }
                                  alt="pic"
                                  loading="lazy"
                                />
                              </figure>
                            </div>
                            <div className="ps-details text-center">
                              <NavLink
                                to={`/our-choice/${curElem?.route}`}
                                className="products-titel m-auto"
                                dangerouslySetInnerHTML={{
                                  __html: curElem?.category_name,
                                }}
                              ></NavLink>
                            </div>
                          </div>
                        </div>
                      ))}
                </OwlCarousel>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default memo(BestProducts);
