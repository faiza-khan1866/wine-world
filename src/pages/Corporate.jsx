import React, { useState, useEffect, memo } from "react";
import { Helmet } from "react-helmet";
import { QueryCache } from "react-query";
import {
  fetchCorporateFaqData,
  useFetchCorporateFaqData,
} from "../http/apiService";
import SubpageBanner from "../components/common/SubpageBanner";
// import CorporateOffer from "../components/Corporate/CorporateOffer";
import CorporateCustomer from "../components/Corporate/CorporateCustomer";
import CorporateGiftForm from "../components/Corporate/CorporateGiftForm";
import FaqSection from "../components/common/FaqSection";
import bannerImg from "../images/banners/New_images/corporate.jpg";
import bannerImgMbl from "../images/banners/New_images/corporateMbl.jpg";

const Corporate = () => {
  const queryCache = new QueryCache();
  const { data: corporateFaqData, isLoading } =
    useFetchCorporateFaqData(queryCache);
  const faqsData = corporateFaqData?.data || [];

  // const [faqsData, setFaqsData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const fetchFaqsListData = async () => {
  //     try {
  //       setIsLoading(true); // Show the loader

  //       const response = await fetchCorporateFaqData();
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
        <title>Corporate | Royal Spirit</title>
        <meta name="description" content="Corporate" />
        <link rel="canonical" href="https://royalspirit.ae/corporate" />
      </Helmet>
      <SubpageBanner
        name="Forge a premium partnership with Royal Spirit"
        indexpage="Home"
        indexvisit="/"
        activepage="Forge a Premium Partnership with Royal Spirit"
        bgImg={bannerImg}
        bgImgMbl={bannerImgMbl}
      />
      <section className="total-body py-5 d-block">
        {/* <CorporateOffer /> */}
        <CorporateCustomer />
        <CorporateGiftForm />
        {faqsData?.length > 0 && (
          <FaqSection faqsList={faqsData} isLoading={isLoading} />
        )}
      </section>
    </>
  );
};
export default memo(Corporate);
