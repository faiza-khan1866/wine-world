import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { fetchGiftProductsData } from "../http/apiService";
import SubpageBanner from "../components/common/SubpageBanner";
import GiftsPageBody from "../components/Gifts/GiftsPageBody";
import FaqSection from "../components/common/FaqSection";
import bannerImg from "../images/banners/subpage-banner.jpg";

const GiftsProducts = () => {
  const { cat } = useParams();
  const [giftProductData, setGiftProductData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [faqsData, setFaqsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchGiftProductsListData = async () => {
      try {
        setIsLoading(true); // Show the loader

        const { data } = await fetchGiftProductsData(cat);
        setGiftProductData(
          data?.product?.filter(
            (product) => product?.price_variation?.length > 0
          )
        );
        setCategoriesData(data?.drop_down);
        setFaqsData(data?.faq);
      } catch (error) {
        console.error("Error fetching Data:", error);
      } finally {
        setIsLoading(false); // Hide the loader
      }
    };

    fetchGiftProductsListData();
  }, [cat]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>{cat?.replace(/-/g, " ")} | Royal Spirit</title>
        <meta name="description" content="Gift" />
      </Helmet>
      <SubpageBanner
        name={cat?.replace(/-/g, " ")}
        indexpage="Home"
        indexvisit="/"
        activepage={cat?.replace(/-/g, " ")}
        bgImg={bannerImg}
      />
      <GiftsPageBody
        productData={giftProductData}
        categoriesList={categoriesData}
        category={cat}
        loading={isLoading}
        setLoading={setIsLoading}
      />
      {faqsData?.length > 0 && <FaqSection faqsList={faqsData} />}
    </>
  );
};
export default GiftsProducts;
