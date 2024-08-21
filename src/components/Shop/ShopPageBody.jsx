import React, { useEffect } from "react";
import ShopPageRight from "./ShopPageRight";
import Aos from "aos";
import "aos/dist/aos.css";
import { FaAngleRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const ShopPageBody = ({
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
  indexvisit,
  indexpage,
  activepage,
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
      <section className="total-body pt-5 d-block sp-bg-page">
        <div className="shop-page">
          <div className="container">
            <div className="page-breakcrumb">
              <ul className="list-unstyled d-flex justify-content-start align-items-start">
                <li>
                  <NavLink to={indexvisit}> {indexpage} </NavLink>
                </li>
                <li>
                  <FaAngleRight />
                </li>
                <li
                  className="active"
                  dangerouslySetInnerHTML={{ __html: activepage }}
                />
              </ul>
            </div>
            <div className="mn-div-page-products">
              <ShopPageRight
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
export default ShopPageBody;
