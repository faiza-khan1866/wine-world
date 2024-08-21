import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { fetchNewsDeatilsData } from "../http/apiService";
import SubpageBanner from "../components/common/SubpageBanner";
import NewsDetails from "../components/News/NewsDetails";
import bannerImg from "../images/banners/newsinnerbanner.png";
import Loader from "../components/Loader/PagesLoader";

const NewsInner = () => {
  const { id } = useParams();
  const [singleNewsData, setSingleNewsData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSingleNewsata = async () => {
      try {
        setIsLoading(true); // Show the loader

        const { data } = await fetchNewsDeatilsData(id);
        setSingleNewsData(data);
      } catch (error) {
        console.error("Error fetching Data:", error);
      } finally {
        setIsLoading(false); // Hide the loader
      }
    };

    fetchSingleNewsata();
  }, [id]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Helmet>
        <title>{singleNewsData?.seo?.meta_title}</title>
        <meta
          name="description"
          content={singleNewsData?.seo?.meta_description}
        />
        <link rel="canonical" href={`https://royalspirit.ae/news/${id}`} />
      </Helmet>
      <SubpageBanner
        name={singleNewsData?.title}
        indexpage="Home"
        indexvisit="/"
        activepage={singleNewsData?.title}
        bgImg={
          singleNewsData?.banner_image
            ? process.env.REACT_APP_IMAGE_BASE_URL +
              singleNewsData?.banner_image
            : bannerImg
        }
      />
      <Loader isLoading={isLoading}>
        <NewsDetails newsData={singleNewsData} />
      </Loader>
    </>
  );
};
export default NewsInner;
