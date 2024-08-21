import React, { useState, useEffect, memo } from "react";
import { Helmet } from "react-helmet";
// import { QueryCache } from "react-query";
import { fetchFaqData, useFetchFaqData } from "../http/apiService";
import SubpageBanner from "../components/common/SubpageBanner";
import FaqSection from "../components/common/FaqSection";
import bannerImg from "../images/banners/New_images/faqs.jpg";
import bannerImgMbl from "../images/banners/New_images/faqsMbl.jpg";
const Faq = () => {
  // const queryCache = new QueryCache();
  // const { data: faqPageData, isLoading } = useFetchFaqData(queryCache);
  // const faqsData = faqPageData?.data || [];

  const [faqsData, setFaqsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchFaqsListData(currentPage);
  }, [currentPage]);

  const fetchFaqsListData = async (page) => {
    try {
      setIsLoading(true); // Show the loader
      const response = await fetchFaqData(page);
      setFaqsData(response?.data?.data); // Assuming the paginated items are in the 'data' key of the response
      setCurrentPage(response?.data?.current_page);
      setLastPage(response?.data?.last_page);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false); // Hide the loader
    }
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1); // react-paginate uses 0-based index
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>FAQ | Royal Spirit</title>
        <meta name="description" content="FAQ" />
        <link rel="canonical" href="https://royalspirit.ae/faq" />
      </Helmet>
      <SubpageBanner
        name="FAQ"
        indexpage="Home"
        indexvisit="/"
        activepage="FAQ"
        bgImg={bannerImg}
        bgImgMbl={bannerImgMbl}
      />
      <section className="total-body d-block">
        <FaqSection
          faqsList={faqsData}
          isLoading={isLoading}
          handlePageChange={handlePageChange}
          pageCount={lastPage}
        />
      </section>
    </>
  );
};
export default memo(Faq);
