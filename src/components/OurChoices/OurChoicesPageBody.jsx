import React, { useEffect } from "react";
import ShopPageRight from "./OurChoicesPageRight";
import Aos from "aos";
import "aos/dist/aos.css";
import OurChoicesPageRight from "./OurChoicesPageRight";

const OurChoicesPageBody = ({
  productData,
  loading,
  setLoading,
  shopDetails,
  handlePageChange,
  lastPage,
  toResult,
  fromResult,
  setFromResult,
  setToResult,
  originalProductData,
  setCurrentPage,
}) => {
  useEffect(() => {
    Aos.init({
      offset: 100,
      easing: "ease",
      delay: 0,
      once: true,
      duration: 800,
    });
  });
  return (
    <>
      <section className="total-body py-5 d-block sp-bg-page">
        <div className="shop-page">
          <div className="container">
            <div className="mn-div-page-products">
              <OurChoicesPageRight
                products={productData}
                loading={loading}
                setLoading={setLoading}
                shopDetails={shopDetails}
                handlePageChange={handlePageChange}
                pageCount={lastPage}
                toResult={toResult}
                fromResult={fromResult}
                setFromResult={setFromResult}
                setToResult={setToResult}
                originalProductData={originalProductData}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default OurChoicesPageBody;
