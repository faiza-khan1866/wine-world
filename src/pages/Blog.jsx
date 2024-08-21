import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import SubpageBanner from "../components/common/SubpageBanner";
import { fetchBlogData, fetchBlogCategoryFilterData } from "../http/apiService";
import BlogList from "../components/Blog/BlogList";
import bannerImg from "../images/banners/subpage-banner.jpg";

const Blog = () => {
  const { cat } = useParams();
  const [blogData, setBlogData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (cat && cat !== "") {
      const fetchBlogFilterData = async () => {
        try {
          setIsLoading(true); // Show the loader

          const { data } = await fetchBlogCategoryFilterData(cat);
          setBlogData(data);
        } catch (error) {
          console.error("Error fetching Data:", error);
        } finally {
          setIsLoading(false); // Hide the loader
        }
      };
      fetchBlogFilterData();
    } else {
      const fetchBlogListData = async () => {
        try {
          setIsLoading(true); // Show the loader

          const { data } = await fetchBlogData();
          setBlogData(data);
        } catch (error) {
          console.error("Error fetching Data:", error);
        } finally {
          setIsLoading(false); // Hide the loader
        }
      };

      fetchBlogListData();
    }
  }, [cat]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Helmet>
        <title>Blog | Royal Spirit</title>
        <meta name="description" content="Blog" />
      </Helmet>
      <SubpageBanner
        name="Blog"
        indexpage="Home"
        indexvisit="/"
        activepage="Blog"
        bgImg={bannerImg}
      />
      <BlogList blogList={blogData} isLoading={isLoading} />
    </>
  );
};

export default Blog;
