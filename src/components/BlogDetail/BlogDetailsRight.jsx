import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import RecentBlogPost from "./RecentBlogPost";
import { NavLink } from "react-router-dom";
import { FaRegCaretSquareRight } from "react-icons/fa";

const BlogDetailsRight = ({ recentBlogList, blogCategoriesList }) => {
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
      {blogCategoriesList?.length > 0 && (
        <div className="blogcategories-div mb-5" data-aos="fade-down">
          <h2 className="mb-2" data-aos="fade-down">
            Categories
          </h2>
          <ul className="list-unstyled">
            {blogCategoriesList?.map((cat, i) => (
              <li key={i} data-aos="fade-up">
                <NavLink to={`/blog/${cat?.route}`}>
                  <FaRegCaretSquareRight /> {cat?.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
      {recentBlogList?.length > 0 && (
        <RecentBlogPost recentBlogs={recentBlogList} />
      )}
    </>
  );
};
export default BlogDetailsRight;
