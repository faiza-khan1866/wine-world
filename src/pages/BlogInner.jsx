import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { fetchBlogDeatilsData } from "../http/apiService";
import SubpageBanner from "../components/common/SubpageBanner";
import BlogDetailsLeft from "../components/BlogDetail/BlogDetailsLeft";
import BlogDetailsRight from "../components/BlogDetail/BlogDetailsRight";
import bannerImg from "../images/banners/subpage-banner.jpg";
import Loader from "../components/Loader/PagesLoader";

const BlogInner = () => {
  const { id } = useParams();
  const [singleBlogData, setSingleBlogData] = useState({});
  const [blogCategoriesData, setBlogCategoriesData] = useState([]);
  const [recentBlogData, setRecentBlogData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchSingleBlogData = async () => {
      try {
        setIsLoading(true); // Show the loader

        const { data } = await fetchBlogDeatilsData(id);
        setSingleBlogData(data?.blog);
        setBlogCategoriesData(data?.categories);
        setRecentBlogData(data?.recent?.filter((x) => x?.route !== id));
      } catch (error) {
        console.error("Error fetching Data:", error);
      } finally {
        setIsLoading(false); // Hide the loader
      }
    };

    fetchSingleBlogData();
  }, [id]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Helmet>
        <title>{singleBlogData?.seo?.meta_title}</title>
        <meta
          name="description"
          content={singleBlogData?.seo?.meta_description}
        />
      </Helmet>
      <SubpageBanner
        name={singleBlogData?.title}
        indexpage="Home"
        indexvisit="/"
        activepage={singleBlogData?.title}
        bgImg={
          singleBlogData?.banner_image
            ? process.env.REACT_APP_IMAGE_BASE_URL +
              singleBlogData?.banner_image
            : bannerImg
        }
      />
      <Loader isLoading={isLoading}>
        <div className="blog-details-total my-5">
          <div className="container">
            <div className="row g-lg-5 mt-0">
              <div className="col-md-7 col-lg-8">
                <BlogDetailsLeft blogData={singleBlogData} />
              </div>
              <div className="col-md-5 col-lg-4">
                <BlogDetailsRight
                  recentBlogList={recentBlogData}
                  blogCategoriesList={blogCategoriesData}
                />
              </div>
            </div>
          </div>
        </div>
      </Loader>
    </>
  );
};
export default BlogInner;
