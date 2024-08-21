import React, { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Aos from "aos";
import "aos/dist/aos.css";

const GiftsFilters = ({
  priceFilterData,
  catFilterData,
  giftCategories,
  isLoading,
}) => {
  const [rangeValues, setRangeValues] = useState([70, 960]);
  const [activeCatId, setActiveCatId] = useState(null);

  useEffect(() => {
    Aos.init({
      offset: 100,
      easing: "ease",
      delay: 0,
      once: true,
      duration: 800,
    });
  });

  const uniqueCategoriesData = Array?.from(
    new Set(giftCategories?.map((obj) => obj?.id))
  ).map((id) => giftCategories?.find((item) => item?.id === id));

  const handleCatClick = (catRoute) => {
    setActiveCatId(catRoute);
    catFilterData(catRoute);
  };

  const handleRangeChange = (values) => {
    setRangeValues(values);
    priceFilterData(values);
    setActiveCatId(null);
  };

  return (
    <>
      <div className="shop-filers-sec py-5">
        <div className="brands_list_wraper">
          <h3 data-aos="fade-down">Filter By Categories</h3>
          {isLoading ? (
            <p className="filter_note">Loading...</p>
          ) : uniqueCategoriesData?.length > 0 ? (
            <ul className="list-unstyled brands_list">
              {uniqueCategoriesData?.map((cat) => (
                <li
                  data-aos="fade-up"
                  key={cat?.id}
                  onClick={() => handleCatClick(cat?.route)}
                  className={activeCatId === cat?.route ? "active" : ""}
                >
                  {cat?.name}
                  {/* <span>({cat?.product_count})</span> */}
                </li>
              ))}
            </ul>
          ) : (
            <p className="filter_note">No Category Found!</p>
          )}
        </div>
        <div className="price_range_wraper">
          <h3 data-aos="fade-down">Filter By Price</h3>
          <Slider
            range
            min={70}
            max={960}
            value={rangeValues}
            onChange={handleRangeChange}
          />
          <div className="range-val" data-aos="fade-up">
            Price: AED {rangeValues[0]} — AED {rangeValues[1]}
          </div>
        </div>
      </div>
    </>
  );
};
export default GiftsFilters;
