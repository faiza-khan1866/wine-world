import React, { useState, useEffect, memo } from "react";
import { Helmet } from "react-helmet";
import { QueryCache } from "react-query";
import { fetchAboutFaqData, useFetchAboutFaqData } from "../http/apiService";
import SubpageBanner from "../components/common/SubpageBanner";
import AboutWelcome from "../components/About/AboutWelcome";
import AboutOffer from "../components/About/AboutOffer";
import AboutProduction from "../components/About/AboutProduction";
import AboutChoose from "../components/About/AboutChoose";
import FaqSection from "../components/common/FaqSection";
import bannerImg from "../images/banners/New_images/aboutUs.jpg";
import bannerImgMbl from "../images/banners/New_images/aboutMbl.jpg";
import ContactMap from "../components/Home/ContactMap";

const About = () => {
  const queryCache = new QueryCache();
  const { data: aboutFaqData, isLoading } = useFetchAboutFaqData(queryCache);
  const faqsData = aboutFaqData?.data || [];

  // const [faqsData, setFaqsData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const fetchFaqsListData = async () => {
  //     try {
  //       setIsLoading(true); // Show the loader

  //       const response = await fetchAboutFaqData();
  //       setFaqsData(response?.data);
  //     } catch (error) {
  //       console.error("Error fetching Data:", error);
  //     } finally {
  //       setIsLoading(false); // Hide the loader
  //     }
  //   };

  //   fetchFaqsListData();
  // }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Helmet>
        <title>About Royal Spirit | Best Online Liquor Shop in Abu Dhabi</title>
        <meta
          name="description"
          content="Royal Spirit: Abu Dhabi's trusted online liquor store. Embrace a legacy of curated wines, spirits, and brews. Shop the finest alcohol selections today!"
        />
        <link rel="canonical" href="https://royalspirit.ae/about" />
      </Helmet>
      <SubpageBanner
        name="Royal Spirit: A world of premium liquor experience awaits"
        indexpage="Home"
        indexvisit="/"
        activepage="Royal Spirit: A world of premium liquor experience awaits"
        bgImg={bannerImg}
        bgImgMbl={bannerImgMbl}
      />
      <section className="total-body d-block">
        <AboutWelcome />
        <AboutOffer />
        <AboutProduction />
        <AboutChoose />
        <ContactMap />

        {faqsData?.length > 0 && (
          <FaqSection faqsList={faqsData} isLoading={isLoading} />
        )}
      </section>
    </>
  );
};
export default memo(About);
