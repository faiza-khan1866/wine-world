import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { fetchGiftTypesData } from "../http/apiService";
import SubpageBanner from "../components/common/SubpageBanner";
import GiftsOffer from "../components/Gifts/GiftsOffer";
import FaqSection from "../components/common/FaqSection";
import bannerImg from "../images/banners/giftbanner.png";

const Gifts = () => {
  const [giftTypesData, setGiftTypesData] = useState([]);
  const [faqsData, setFaqsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchGiftTypesListData = async () => {
      try {
        setIsLoading(true); // Show the loader

        const response = await fetchGiftTypesData();
        setGiftTypesData(response?.data?.list);
        setFaqsData(response?.data?.faq);
      } catch (error) {
        console.error("Error fetching Data:", error);
      } finally {
        setIsLoading(false); // Hide the loader
      }
    };

    fetchGiftTypesListData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Helmet>
        <title>Gift | Royal Spirit</title>
        <meta name="description" content="Gift" />
      </Helmet>
      <SubpageBanner
        name="Gifts"
        indexpage="Home"
        indexvisit="/"
        activepage="Gifts"
        bgImg={bannerImg}
      />
      <section className="total-body pt-5 d-block">
        <GiftsOffer giftTypesList={giftTypesData} isLoading={isLoading} />
        {faqsData?.length > 0 && (
          <FaqSection faqsList={faqsData} isLoading={isLoading} />
        )}
      </section>
    </>
  );
};
export default Gifts;
