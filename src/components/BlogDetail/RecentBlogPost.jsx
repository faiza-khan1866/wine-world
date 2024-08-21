import React from "react";
import { NavLink } from "react-router-dom";
import blog from "../../images/about/aboutpuresec.png";

const RecentBlogPost = ({ recentBlogs }) => {
  return (
    <>
      <div className="recent-blog-part" data-aos="fade-up">
        <h2 className="mb-2" data-aos="fade-down">
          Recent post
        </h2>
        <div className="recent-all-post">
          {recentBlogs?.map((curElem) => (
            <div
              className="comon-recent d-flex justify-content-between align-items-center"
              key={curElem?.id}
              data-aos="fade-up"
            >
              <NavLink
                to={`/blog/${curElem?.category?.route}/${curElem?.route}`}
              >
                <figure>
                  <img
                    src={
                      curElem?.featured_img
                        ? process.env.REACT_APP_IMAGE_BASE_URL +
                          curElem?.featured_img
                        : blog
                    }
                    alt="blog"
                  />
                </figure>
              </NavLink>
              <NavLink
                to={`/blog/${curElem?.category?.route}/${curElem?.route}`}
              >
                <h5> {curElem?.title} </h5>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default RecentBlogPost;
