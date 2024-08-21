import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import SubpageBanner from "../components/common/SubpageBanner";
import { fetchNewsData } from "../http/apiService";
import NewsList from "../components/News/NewsList";
import bannerImg from "../images/banners/New_images/news.jpg";
import bannerImgMbl from "../images/banners/New_images/newsMbl.jpg";

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchNewsListData = async () => {
      try {
        setIsLoading(true); // Show the loader

        const { data } = await fetchNewsData();
        setNewsData(data);
      } catch (error) {
        console.error("Error fetching Data:", error);
      } finally {
        setIsLoading(false); // Hide the loader
      }
    };

    fetchNewsListData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Helmet>
        <title>News | Royal Spirit</title>
        <meta name="description" content="News" />
        <link rel="canonical" href="https://royalspirit.ae/news" />
      </Helmet>
      <SubpageBanner
        name="News"
        indexpage="Home"
        indexvisit="/"
        activepage="News"
        bgImg={bannerImg}
        bgImgMbl={bannerImgMbl}
      />

      <NewsList newsList={newsData} isLoading={isLoading} />
    </>
  );
};

export default News;
