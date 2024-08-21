import React, { useState, useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { NavLink } from "react-router-dom";
import blog from "../../images/about/aboutpuresec.png";
import ReactPaginate from "react-paginate";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import DataLoader from "../Loader/DataLoader";

const NewsList = ({ newsList, isLoading }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 6;
  const pagesVisited = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(newsList?.length / itemsPerPage);
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
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
      <div className="news_sec_area py-5">
        <div className="container">
          <h2 className="text-center" data-aos="fade-down">
            We’ve been featured
          </h2>
          {isLoading ? (
            <DataLoader />
          ) : newsList?.length > 0 ? (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 gy-5 gy-lg-0 g-lg-5 mt-0">
              {newsList
                ?.slice(pagesVisited, pagesVisited + itemsPerPage)
                ?.map((post) => (
                  <div className="col" key={post?.id}>
                    <div className="item" data-aos="zoom-in">
                      <div className="comon-news-part">
                        <div className="comon-pic-news">
                          <figure className="position-relative">
                            <NavLink to={`/news/${post?.route}`}>
                              <img
                                src={
                                  post?.featured_img
                                    ? process.env.REACT_APP_IMAGE_BASE_URL +
                                      post?.featured_img
                                    : blog
                                }
                                alt="picb"
                              />
                            </NavLink>
                          </figure>
                          {post?.logos_and_links?.[0]?.link !== null && (
                            <div className="row row-cols-4 news_logos_sec justify-content-center align-items-center ">
                              {post?.logos_and_links
                                ?.slice(0, 4)
                                ?.map((x, i) => (
                                  <div className="col text-center" key={i}>
                                    <img
                                      src={
                                        process.env.REACT_APP_IMAGE_BASE_URL +
                                        x?.logo
                                      }
                                      alt="logo"
                                      className="img-fluid"
                                      loading="lazy"
                                      onClick={() => window.open(x?.link)}
                                    />
                                  </div>
                                ))}
                            </div>
                          )}
                        </div>
                        <div className="dtails-idv-text">
                          <h5>{post?.title}</h5>
                          <NavLink
                            to={`/news/${post?.route}`}
                            className="btn read-more-bn borderRadius_1"
                          >
                            Read more
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <p
              className="prod_note text-dark text-center py-5"
              data-aos="fade-up"
            >
              No News Found!
            </p>
          )}
        </div>
      </div>
      {newsList?.length >= itemsPerPage && (
        <div className="pagination_style pb-3">
          <ReactPaginate
            breakLabel="..."
            nextLabel={<FaAngleDoubleRight fontSize={15} />}
            pageCount={pageCount}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            onPageChange={handlePageClick}
            previousLabel={<FaAngleDoubleLeft fontSize={15} />}
            renderOnZeroPageCount={null}
          />
        </div>
      )}
    </>
  );
};
export default NewsList;
