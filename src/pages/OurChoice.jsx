import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useLocation, useParams } from "react-router-dom";
import {
  fetchOurChoicesProductData,
  fetchProductData,
} from "../http/apiService";
import SubpageBanner from "../components/common/SubpageBanner";
import FaqSection from "../components/common/FaqSection";
import bannerImg from "../images/banners/subpage-banner.jpg";
import beersbannerImg from "../images/banners/beersbanner.png";
import winebannerImg from "../images/banners/winebanner.png";
import spiritsbannerImg from "../images/banners/spiritsbanner.png";
import othersbannerImg from "../images/banners/othersbanner.png";
import cigarsbannerImg from "../images/banners/cigarsbanner.png";
import liquiorchocolatesbannerImg from "../images/banners/liquiorchocolatesbanner.png";
import OurChoicesPageBody from "../components/OurChoices/OurChoicesPageBody";

const OurChoice = () => {
  const location = useLocation();
  const { cat, subcat, choice } = useParams();
  const [originalProductData, setOriginalProductData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [fromResult, setFromResult] = useState(0);
  const [toResult, setToResult] = useState(0);
  const [faqsData, setFaqsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [metaDetails, setMetaDetails] = useState({});

  useEffect(() => {
    fetchProductListData(currentPage);
  }, [cat, subcat, currentPage]);

  useEffect(() => {
    if (location) {
      setCurrentPage(1);
      setFromResult(0);
      setToResult(0);
    }
  }, [location]);

  const fetchProductListData = async (page) => {
    try {
      setIsLoading(true); // Show the loader
      const response = await fetchOurChoicesProductData(choice, page);
      const data = response?.data[0] ? response?.data[0]?.product : null;
      setProductData(
        data?.filter((product) => product?.price_variation?.length > 0)
      );
      setOriginalProductData(
        data?.filter((product) => product?.price_variation?.length > 0)
      );
      // setCurrentPage(response?.data?.product?.current_page);
      // setLastPage(response?.data?.product?.last_page);

      // setToResult(response?.data?.product?.to);
      // setFromResult(response?.data?.product?.from);
      let foundMetaDetails;

      // setMetaDetails(foundMetaDetails);
      setFaqsData(response?.data[0] ? response?.data[0]?.faq : []);
    } catch (error) {
      console.error("Error fetching Data:", error);
    } finally {
      setIsLoading(false); // Hide the loader
    }
  };

  const handlePageChange = (selectedPage, start) => {
    if (start) {
      setCurrentPage(selectedPage.selected); // react-paginate uses 0-based index
      return;
    }
    setCurrentPage(selectedPage.selected + 1); // react-paginate uses 0-based index
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Helmet>
        <title>{metaDetails?.seo?.meta_title}</title>
        <meta name="description" content={metaDetails?.seo?.meta_description} />
        <script type="application/ld+json">
          {JSON.stringify(metaDetails?.seo?.schema_markup)}
        </script>
      </Helmet>
      <SubpageBanner
        name={cat?.replace(/-/g, " ")}
        indexpage="Home"
        indexvisit="/"
        activepage={cat?.replace(/-/g, " ")}
        bgImg={
          cat == "beer"
            ? beersbannerImg
            : cat == "spirit"
            ? spiritsbannerImg
            : cat == "wine"
            ? winebannerImg
            : cat == "others"
            ? othersbannerImg
            : cat == "cigars"
            ? cigarsbannerImg
            : cat == "liquor-chocolate"
            ? liquiorchocolatesbannerImg
            : bannerImg
        }
      />
      <OurChoicesPageBody
        productData={productData}
        loading={isLoading}
        setLoading={setIsLoading}
        shopDetails={metaDetails}
        handlePageChange={handlePageChange}
        lastPage={lastPage}
        toResult={toResult}
        fromResult={fromResult}
        setFromResult={setFromResult}
        setToResult={setToResult}
        originalProductData={originalProductData}
        setCurrentPage={setCurrentPage}
      />
      {faqsData?.length > 0 && <FaqSection faqsList={faqsData} />}
    </>
  );
};
export default OurChoice;
