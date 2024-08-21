import React, { useState, useEffect } from "react";
import {
  fetchOriginSubCategoryData,
  fetchOurChoiceFilter,
} from "../../http/apiService";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Aos from "aos";
import "aos/dist/aos.css";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
// import { AiOutlineSearch, AiFillCloseCircle } from "react-icons/ai";
// import { Form, InputGroup } from "react-bootstrap";

const OurChoicesFilters = ({
  cat,
  subcat,
  choice,
  priceFilterData,
  originFilterData,
  brandFilterData,
  // searchBarFilterData,
  handlePageChange,
}) => {
  // const location = useLocation();
  const navigate = useNavigate();
  const [rangeValues, setRangeValues] = useState([30, 1600]);
  const [brandsData, setBrandsData] = useState([]);
  const [originData, setOriginData] = useState([]);
  const [subCategoriesData, setSubCategoriesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeOriginId, setActiveOriginId] = useState(null);
  const [activeBrandId, setActiveBrandId] = useState(null);
  const initialBrandsToShow = 6;
  const [brandsToShow, setBrandsToShow] = useState(initialBrandsToShow);
  const [filterCategory, setFilterCategory] = useState([]);

  useEffect(() => {
    const fetchOriginSubCategoryListData = async () => {
      try {
        setIsLoading(true); // Show the loader
        const response = await fetchOurChoiceFilter(choice);
        setFilterCategory(response.data);
      } catch (error) {
        console.error("Error fetching Data:", error);
      } finally {
        setIsLoading(false); // Hide the loader
      }
    };

    fetchOriginSubCategoryListData();
  }, []);

  useEffect(() => {
    Aos.init({
      offset: 100,
      easing: "ease",
      delay: 0,
      once: true,
      duration: 800,
    });
  });

  const handleChoicesClick = (route) => {
    handlePageChange({ selected: 0 }, true);
    navigate(`/our-choice/${route}`);
  };

  const handleRangeChange = (values) => {
    setRangeValues(values);
    priceFilterData(values);
    setActiveBrandId(null);
    setActiveOriginId(null);
    navigate(`/our-choice/${choice}?price=AED${values[0]}-AED${values[1]}`);
  };

  return (
    <>
      <div className="shop-filers-sec py-5">
        <div className="subcategory_list_wraper">
          <h3 data-aos="fade-down">Filter by Choices</h3>
          {isLoading ? (
            <p className="filter_note">Loading...</p>
          ) : filterCategory?.length > 0 ? (
            <div className="subcategory_list">
              {filterCategory?.map((item, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleChoicesClick(item?.route)}
                  className={`btn filter-bn ${
                    choice === item?.route ? "active" : ""
                  }`}
                  data-aos="fade-up"
                >
                  {item?.category_name}
                </button>
              ))}
            </div>
          ) : (
            <p className="filter_note">No Choices found!</p>
          )}
        </div>
        <div className="price_range_wraper">
          <h3 data-aos="fade-down">Filter by price</h3>
          <Slider
            range
            min={30}
            max={1600}
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
export default OurChoicesFilters;
