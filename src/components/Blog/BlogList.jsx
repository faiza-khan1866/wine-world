import React, { useState, useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { FaUser, FaTags } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import blog from "../../images/about/aboutpuresec.png";
import ReactPaginate from "react-paginate";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import DataLoader from "../Loader/DataLoader";

const BlogList = ({ blogList, isLoading }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 6;
  const pagesVisited = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(blogList?.length / itemsPerPage);
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };
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
  return (
    <>
      <div className="blog-page-div sub-pages py-5">
        <div className="container">
          <h2 className="text-center" data-aos="fade-down">
            Our blog
          </h2>
          {isLoading ? (
            <DataLoader />
          ) : blogList?.length > 0 ? (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-3 gy-5 gy-lg-0 g-lg-5 mt-0">
              {blogList
                ?.slice(pagesVisited, pagesVisited + itemsPerPage)
                ?.map((post) => (
                  <div className="col" key={post?.id}>
                    <div className="item" data-aos="fade-up">
                      <div className="comon-news-part">
                        <div className="comon-pic-news">
                          <figure className="position-relative">
                            <NavLink
                              to={`/blog/${post?.category?.route}/${post?.route}`}
                            >
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
                          <div className="date-text">
                            {new Date(post?.created_at)?.toLocaleDateString(
                              "en-US",
                              date
                            )}
                            <span className="d-block">
                              {new Date(post?.created_at)?.toLocaleDateString(
                                "en-US",
                                month
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="dtails-idv-text">
                          <ul className="list-unstyled d-flex">
                            <li>
                              <FaUser /> Post by {post?.created_by}
                            </li>
                            {post?.category?.name && (
                              <li>
                                <FaTags />
                                {post?.category?.name}
                              </li>
                            )}
                          </ul>
                          <h5> {post?.title} </h5>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: post?.short_description,
                            }}
                          />
                          <NavLink
                            to={`/blog/${post?.category?.route}/${post?.route}`}
                            className="btn read-more-bn"
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
            <p className="prod_note text-dark py-5" data-aos="fade-up">
              No Blog Found!
            </p>
          )}
        </div>
      </div>
      {blogList?.length >= itemsPerPage && (
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
export default BlogList;
