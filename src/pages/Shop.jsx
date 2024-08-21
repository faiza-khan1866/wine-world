import React, { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet";
import { useLocation, useParams } from "react-router-dom";
import { fetchProductData } from "../http/apiService";
// import SubpageBanner from "../components/common/SubpageBanner";
import ShopPageBody from "../components/Shop/ShopPageBody";
import FaqSection from "../components/common/FaqSection";
// import bannerImg from "../images/banners/subpage-banner.jpg";
// import beersbannerImg from "../images/banners/New_images/beer.jpg";
// import beersbannerImgMbl from "../images/banners/New_images/beerMbl.jpg";
// import winebannerImg from "../images/banners/New_images/wine.jpg";
// import winebannerImgMbl from "../images/banners/New_images/wineMbl.jpg";
// import spiritsbannerImg from "../images/banners/New_images/whiskey.jpg";
// import spiritsbannerImgMbl from "../images/banners/New_images/whiskeyMbl.jpg";
// import othersbannerImg from "../images/banners/New_images/other.jpg";
// import othersbannerImgMbl from "../images/banners/New_images/otherMbl.jpg";
// import cigarsbannerImg from "../images/banners/cigarsbanner.png";
// import liquiorchocolatesbannerImg from "../images/banners/liquiorchocolatesbanner.png";
const Shop = () => {
  const location = useLocation();
  let query = useMemo(() => {
    return location?.search?.split("=");
  }, [location?.search]);
  let queryType = useMemo(() => {
    return query[0]?.replace("?", "");
  }, [query]);
  let qeuryParms = useMemo(() => {
    return query[1];
  }, [query]);

  let queryValue = useMemo(() => {
    return queryType?.includes("price")
      ? qeuryParms?.replaceAll("AED", "")?.split("-")
      : qeuryParms;
  }, [query]);
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
    // if (cat == "promotion") {
    //   fetchSalesProductListData(currentPage);
    // } else {
    fetchProductListData(currentPage);
    // }
  }, [cat, subcat, currentPage]);

  useEffect(() => {
    if (location) {
      // setCurrentPage(1);
      setFromResult(0);
      setToResult(0);
    }
  }, [location]);

  const fetchProductListData = async (page) => {
    try {
      setIsLoading(true); // Show the loader
      const response = await fetchProductData(cat, subcat, page);
      const data = response?.data?.product?.data;
      setProductData(
        structuredClone(
          data?.filter((product) => product?.price_variation?.length > 0)
        )
      );
      setOriginalProductData(
        structuredClone(
          data?.filter((product) => product?.price_variation?.length > 0)
        )
      );
      setCurrentPage(structuredClone(response?.data?.product?.current_page));
      setLastPage(structuredClone(response?.data?.product?.last_page));

      setToResult(structuredClone(response?.data?.product?.to));
      setFromResult(structuredClone(response?.data?.product?.from));
      let foundMetaDetails;
      if (subcat) {
        if (
          data?.find((product) => product?.sub_category?.route === subcat)
            ?.sub_category == undefined ||
          data?.find((product) => product?.sub_category?.route === subcat)
            ?.sub_category?.title == null
        ) {
          foundMetaDetails = data?.find(
            (product) => product?.category?.route === cat
          )?.category;
        } else {
          foundMetaDetails = data?.find(
            (product) => product?.sub_category?.route === subcat
          )?.sub_category;
        }
      } else {
        foundMetaDetails = data?.find(
          (product) => product?.category?.route === cat
        )?.category;
      }
      setMetaDetails(structuredClone(foundMetaDetails));
      setFaqsData(structuredClone(response?.data?.faq));
    } catch (error) {
      console.error("Error fetching Data:", error);
      setProductData([]);
      setOriginalProductData([]);
      setCurrentPage(1);
      setLastPage(1);
      setToResult(0);
      setFromResult(0);
      setMetaDetails({});
      setFaqsData([]);
    } finally {
      setIsLoading(false); // Hide the loader
    }
  };

  // const fetchSalesProductListData = async (page) => {
  //   try {
  //     setIsLoading(true); // Show the loader
  //     const response = await fetchSalesProductsData(page);
  //     const data = response?.data?.product?.data;
  //     setProductData(
  //       data?.filter((product) => product?.price_variation?.length > 0)
  //     );
  //     setOriginalProductData(
  //       data?.filter((product) => product?.price_variation?.length > 0)
  //     );
  //     setCurrentPage(response?.data?.product?.current_page);
  //     setLastPage(response?.data?.product?.last_page);

  //     setToResult(response?.data?.product?.to);
  //     setFromResult(response?.data?.product?.from);
  //     let foundMetaDetails;
  //     if (subcat) {
  //       if (
  //         data?.find((product) => product?.sub_category?.route === subcat)
  //           ?.sub_category == undefined ||
  //         data?.find((product) => product?.sub_category?.route === subcat)
  //           ?.sub_category?.title == null
  //       ) {
  //         foundMetaDetails = data?.find(
  //           (product) => product?.category?.route === cat
  //         )?.category;
  //       } else {
  //         foundMetaDetails = data?.find(
  //           (product) => product?.sub_category?.route === subcat
  //         )?.sub_category;
  //       }
  //     } else {
  //       foundMetaDetails = data?.find(
  //         (product) => product?.category?.route === cat
  //       )?.category;
  //     }
  //     setMetaDetails(foundMetaDetails);
  //     setFaqsData(response?.data?.faq);
  //   } catch (error) {
  //     console.error("Error fetching Data:", error);
  //   } finally {
  //     setIsLoading(false); // Hide the loader
  //   }
  // };

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
        <link rel="canonical" href={`https://royalspirit.ae/shop/${cat}`} />
      </Helmet>
      {/* <SubpageBanner
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
        bgImgMbl={
          cat == "beer"
            ? beersbannerImgMbl
            : cat == "spirit"
            ? spiritsbannerImgMbl
            : cat == "wine"
            ? winebannerImgMbl
            : cat == "others"
            ? othersbannerImgMbl
            : cat == "cigars"
            ? cigarsbannerImg
            : cat == "liquor-chocolate"
            ? liquiorchocolatesbannerImg
            : bannerImg
        }
      /> */}
      <div className="Mgt" style={{ background: "black" }}></div>
      <ShopPageBody
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
        indexpage="Home"
        indexvisit="/"
        activepage={cat?.replace(/-/g, " ")}
      />
      {faqsData?.length > 0 && <FaqSection faqsList={faqsData} />}
    </>
  );
};
export default Shop;
