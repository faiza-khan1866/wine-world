import React, { useEffect } from "react";
import GiftsPageRight from "./GiftsPageRight";
import Aos from "aos";
import "aos/dist/aos.css";

const GiftsPageBody = ({
  productData,
  category,
  loading,
  setLoading,
  categoriesList,
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
      <section className="total-body sub-pages py-5 d-block sp-bg-page">
        <div className="shop-page">
          <div className="container">
            <div className="mn-div-page-products">
              <GiftsPageRight
                products={productData}
                category={category}
                loading={loading}
                setLoading={setLoading}
                categories={categoriesList}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default GiftsPageBody;
