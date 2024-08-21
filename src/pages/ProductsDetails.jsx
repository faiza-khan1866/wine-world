import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { fetchProductDetailData } from "../http/apiService";
import SubpageBanner from "../components/common/SubpageBanner";
import ProductsDetailsBody from "../components/ProductDetail/ProductsDetailsBody";
import bannerImg from "../images/banners/subpage-banner.jpg";

import beersbannerImg from "../images/banners/New_images/beer.jpg";
import beersbannerImgMbl from "../images/banners/New_images/beerMbl.jpg";
import winebannerImg from "../images/banners/New_images/wine.jpg";
import winebannerImgMbl from "../images/banners/New_images/wineMbl.jpg";
import spiritsbannerImg from "../images/banners/New_images/whiskey.jpg";
import spiritsbannerImgMbl from "../images/banners/New_images/whiskeyMbl.jpg";
import othersbannerImg from "../images/banners/New_images/other.jpg";
import othersbannerImgMbl from "../images/banners/New_images/otherMbl.jpg";
import cigarsbannerImg from "../images/banners/cigarsbanner.png";
import liquiorchocolatesbannerImg from "../images/banners/liquiorchocolatesbanner.png";

import Loader from "../components/Loader/PagesLoader";

const ProductsDetails = () => {
  // const { cat, id } = useParams();
  const { id } = useParams();
  const [cat, setCat] = useState(null);
  const [singleProductData, setSingleProductData] = useState({});
  const [relatedProductData, setRelatedProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSingleProductData = async () => {
      try {
        setIsLoading(true);

        const { data } = await fetchProductDetailData(id);
        setSingleProductData(data?.product);
        setCat(data?.product?.category?.name.toLowerCase());
        setRelatedProductData(
          data?.similar_products?.filter((x) => x?.route !== id)
        );
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching Data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSingleProductData();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>{singleProductData?.seo?.meta_title}</title>
        <meta
          name="description"
          content={singleProductData?.seo?.meta_description}
        />
        <link rel="canonical" href={`https://royalspirit.ae/product/${id}`} />
        <script type="application/ld+json">
          {JSON.stringify(singleProductData?.seo?.schema_markup)}
        </script>
      </Helmet>
      {/* <SubpageBanner
        name={singleProductData?.name}
        indexpage="Home"
        indexvisit="/"
        activepage={singleProductData?.name}
        bgImg={
          cat == "beer"
            ? beersbannerImg
            : cat == "spirit"
            ? winebannerImg
            : cat == "wine"
            ? spiritsbannerImg
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
      <Loader isLoading={isLoading}>
        <ProductsDetailsBody
          productData={singleProductData}
          relatedProducts={relatedProductData}
          catRoute={cat}
          activepage={singleProductData?.name}
          indexpage={"home"}
          indexvisit="/"
        />
      </Loader>
    </>
  );
};
export default ProductsDetails;
