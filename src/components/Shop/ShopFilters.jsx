import React, { useState, useEffect, useRef } from "react";
import { fetchOriginSubCategoryData } from "../../http/apiService";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Aos from "aos";
import "aos/dist/aos.css";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowDown, FaArrowUp, FaCross, FaWindowClose } from "react-icons/fa";
// import { AiOutlineSearch, AiFillCloseCircle } from "react-icons/ai";
// import { Form, InputGroup } from "react-bootstrap";
import { IoCloseCircle } from "react-icons/io5";
import { FaFilter } from "react-icons/fa";
const ShopFilters = ({
  cat,
  subcat,
  priceFilterData,
  originFilterData,
  brandFilterData,
  // searchBarFilterData,
  handlePageChange,
}) => {
  // const location = useLocation();
  const navigate = useNavigate();
  const [rangeValues, setRangeValues] = useState([30, 50000]);
  const [israngeValues, setIsRangeValues] = useState(false);
  const [brandsData, setBrandsData] = useState([]);
  const [originData, setOriginData] = useState([]);
  const [subCategoriesData, setSubCategoriesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeOriginId, setActiveOriginId] = useState(null);
  const [activeBrandId, setActiveBrandId] = useState(null);
  const initialBrandsToShow = 6;
  const [brandsToShow, setBrandsToShow] = useState(initialBrandsToShow);
  const initialOriginsToShow = 6;
  const [originsToShow, setoriginsToShow] = useState(initialOriginsToShow);
  const [showFilter, setSHowFIlter] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setSHowFIlter(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  useEffect(() => {
    setRangeValues([30, 50000]);
    setIsRangeValues(false);
  }, [cat, subcat]);
  const handleShowMore = () => {
    setBrandsToShow(brandsToShow + 6);
  };

  const handleShowLess = () => {
    setBrandsToShow(initialBrandsToShow);
  };
  const handleShowMoreOrigin = () => {
    setoriginsToShow(originsToShow + 6);
  };

  const handleShowLessOrigin = () => {
    setoriginsToShow(initialOriginsToShow);
  };
  // const [searchTerm, setSearchTerm] = useState("");

  // const handleSearchChange = (e) => {
  //   const inputValue = e.target.value;
  //   setSearchTerm(inputValue);
  //   if (inputValue?.length >= 3) {
  //     searchBarFilterData(inputValue);
  //     // navigate(
  //     //   `/shop/${cat}?search=${inputValue
  //     //     ?.split(" ")
  //     //     ?.join("-")
  //     //     ?.toLowerCase()}`
  //     // );
  //   }
  //   if (inputValue?.length == 0) {
  //     searchBarFilterData("", true);
  //     navigate(location?.pathname);
  //   }
  // };

  // useEffect(() => {
  //   if (location) {
  //     setSearchTerm("");
  //   }
  // }, [location]);

  useEffect(() => {
    const fetchOriginSubCategoryListData = async () => {
      try {
        setIsLoading(true); // Show the loader
        const response = await fetchOriginSubCategoryData(cat);
        setBrandsData(response?.data?.brand);
        setOriginData(response?.data?.origin);
        if (cat == "premium") {
          setSubCategoriesData(response?.data?.sub_category);
        } else {
          setSubCategoriesData(response?.data?.sub_category?.sub_category);
        }
      } catch (error) {
        console.error("Error fetching Data:", error);
      } finally {
        setIsLoading(false); // Hide the loader
      }
    };

    fetchOriginSubCategoryListData();
  }, [cat]);

  useEffect(() => {
    Aos.init({
      offset: 100,
      easing: "ease",
      delay: 0,
      once: true,
      duration: 800,
    });
  });

  const uniqueBrandsData = Array?.from(
    new Set(brandsData?.map((obj) => obj?.id))
  ).map((id) => brandsData?.find((brand) => brand?.id === id));

  const uniqueCategoriesData = Array?.from(
    new Set(subCategoriesData?.map((obj) => obj?.id))
  ).map((id) => subCategoriesData?.find((subCat) => subCat?.id === id));

  const totalBrands = uniqueBrandsData?.length;

  const uniqueOriginsData = Array?.from(
    new Set(originData?.map((obj) => obj))
  ).map((name) => originData?.find((item) => item === name));

  const totalOrigins = uniqueOriginsData?.length;

  const handleBrandClick = (brandId, brandRoute) => {
    setActiveBrandId(brandId);
    brandFilterData(brandId);
    setActiveOriginId(null);
    navigate(`/shop/${cat}?brand=${brandRoute}`);
  };

  const handleOriginClick = (originId, originName) => {
    setActiveOriginId(originId);
    originFilterData(originName);
    setActiveBrandId(null);
    navigate(
      `/shop/${cat}?origin=${originName?.split(" ")?.join("-")?.toLowerCase()}`
    );
  };

  const handleSubCatClick = (subCatRoute) => {
    handlePageChange({ selected: 0 }, true);
    setActiveBrandId(null);
    setActiveOriginId(null);
    navigate(`/shop/${cat}/${subCatRoute}`);
  };

  const handleRangeChange = (values) => {
    setIsRangeValues(true);
    setRangeValues(values);
  };

  const handleRangeCustomChange = (e) => {
    setIsRangeValues(true);
    let currentRange = [...rangeValues];
    currentRange[`${e.target.name}`] = e.target.value;
    setRangeValues(currentRange);
    console.log("🚀 ~ handleRangeCustomChange ~ currentRange:", currentRange);
  };
  const handleRangeFilter = () => {
    priceFilterData(rangeValues);
    setActiveBrandId(null);
    setActiveOriginId(null);
    navigate(`/shop/${cat}?price=AED${rangeValues[0]}-AED${rangeValues[1]}`);
  };

  return (
    <>
      <button
        className="FIlterBnts borderRadius_1"
        onClick={() => setSHowFIlter(true)}
      >
        <FaFilter size={15} /> &nbsp; Filter
      </button>
      <div
        ref={wrapperRef}
        className={`${showFilter ? "SHop_Resp SHop_RespShow" : "SHop_Resp"}`}
      >
        <div className="CloseFIlter" onClick={() => setSHowFIlter(false)}>
          <IoCloseCircle size={30} />
        </div>
        <div className="shop-filers-sec py-5">
          <div className="brands_list_wraper">
            <h3>Filter by brands</h3>
            {/* <Form data-aos="fade-up">
            <Form.Group controlId="search">
              <InputGroup>
                <Form.Control
                  type="text"
                  name="search"
                  placeholder="Search here.."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  style={{ borderRight: "0" }}
                />
                <InputGroup.Text>
                  {searchTerm.length >= 1 ? (
                    <AiFillCloseCircle
                      fontSize="20px"
                      onClick={() => {
                        searchBarFilterData("", true);
                        setSearchTerm("");
                        setActiveOriginId(null);
                        navigate(location?.pathname);
                      }}
                      style={{ cursor: "pointer" }}
                    />
                  ) : (
                    <AiOutlineSearch fontSize="20px" />
                  )}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </Form> */}
            {isLoading ? (
              <p className="filter_note">Loading...</p>
            ) : uniqueBrandsData?.length > 0 ? (
              <>
                <ul className="list-unstyled brands_list mb-0">
                  {uniqueBrandsData?.slice(0, brandsToShow)?.map((brand) => (
                    <li
                      key={brand?.id}
                      onClick={() => {
                        handleBrandClick(brand?.id, brand?.route);
                        setSHowFIlter(false);
                      }}
                      className={activeBrandId === brand?.id ? "active" : ""}
                    >
                      {brand?.name}
                      {/* <span>({brand?.product_count})</span> */}
                    </li>
                  ))}
                </ul>
                {brandsToShow < totalBrands ? (
                  <li className="show_more_less" onClick={handleShowMore}>
                    Show More <FaArrowDown />
                  </li>
                ) : totalBrands < 8 ? null : (
                  <li className="show_more_less" onClick={handleShowLess}>
                    Show Less <FaArrowUp />
                  </li>
                )}
                {brandsToShow >= totalBrands ? null : brandsToShow > 12 ? (
                  <li className="show_close mt-2" onClick={handleShowLess}>
                    Reset <FaWindowClose />
                  </li>
                ) : null}
              </>
            ) : (
              <p className="filter_note">No brand found!</p>
            )}
          </div>
          <div className="subcategory_list_wraper">
            <h3 data-aos="fade-down">
              Filter by {cat == "premium" ? "categories" : "sub-categories"}
            </h3>
            {isLoading ? (
              <p className="filter_note">Loading...</p>
            ) : uniqueCategoriesData?.length > 0 ? (
              <div className="subcategory_list">
                {uniqueCategoriesData?.map((subCat) => (
                  <button
                    key={subCat?.id}
                    type="button"
                    onClick={() => {
                      handleSubCatClick(subCat?.route);
                      setSHowFIlter(false);
                    }}
                    className={`btn filter-bn ${
                      subcat === subCat?.route ? "active" : ""
                    }`}
                    data-aos="fade-up"
                  >
                    {subCat?.name}
                  </button>
                ))}
              </div>
            ) : (
              <p className="filter_note">
                No {cat == "premium" ? "category" : "sub-category"} found!
              </p>
            )}
          </div>
          {cat == "wine" && (
            <div className="brands_list_wraper">
              <h3>Filter by origins</h3>
              {isLoading ? (
                <p className="filter_note">Loading...</p>
              ) : uniqueOriginsData?.length > 0 ? (
                <>
                  <ul className="list-unstyled brands_list">
                    {uniqueOriginsData
                      ?.slice(0, originsToShow)
                      ?.map((origin, i) => (
                        <li
                          key={i}
                          onClick={() => {
                            handleOriginClick(i, origin);
                            setSHowFIlter(false);
                          }}
                          className={activeOriginId === i ? "active" : ""}
                        >
                          {origin}
                        </li>
                      ))}
                  </ul>
                  {originsToShow < totalOrigins ? (
                    <li
                      className="show_more_less"
                      onClick={handleShowMoreOrigin}
                    >
                      Show More <FaArrowDown />
                    </li>
                  ) : totalOrigins < 8 ? null : (
                    <li
                      className="show_more_less"
                      onClick={handleShowLessOrigin}
                    >
                      Show Less <FaArrowUp />
                    </li>
                  )}
                  {originsToShow >= totalOrigins ? null : originsToShow > 10 ? (
                    <li
                      className="show_close mt-3"
                      onClick={handleShowLessOrigin}
                    >
                      Reset <FaWindowClose />
                    </li>
                  ) : null}
                </>
              ) : (
                <p className="filter_note">No origin found!</p>
              )}
            </div>
          )}
          <div className="price_range_wraper">
            <h3 data-aos="fade-down">Filter by price</h3>
            {/* <Slider
              range
              min={30}
              max={2000}
              value={rangeValues}
              onChange={handleRangeChange}
            /> */}
            {/* <div className="range-val" data-aos="fade-up">
              Price: AED {rangeValues[0]} — AED {rangeValues[1]}
            </div> */}

            <div className="range-val" data-aos="fade-up">
              Price:{" "}
              <input
                text
                value={rangeValues[0]}
                className="SliderInput"
                name="0"
                onChange={(e) => handleRangeCustomChange(e)}
              />{" "}
              —{" "}
              <input
                text
                value={rangeValues[1]}
                className="SliderInput"
                name="1"
                onChange={(e) => handleRangeCustomChange(e)}
              />{" "}
              AED
            </div>
            {israngeValues ? (
              <div>
                <button
                  className="btn primary_btn borderRadius_1 mt-3"
                  onClick={() => {
                    handleRangeFilter();
                    setSHowFIlter(false);
                  }}
                >
                  Filter
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      {/* deskTOp filter */}
      <div className="DeskTopFIlter">
        <div className="shop-filers-sec py-5">
          <div className="brands_list_wraper">
            <h3>Filter by brands</h3>
            {/* <Form data-aos="fade-up">
            <Form.Group controlId="search">
              <InputGroup>
                <Form.Control
                  type="text"
                  name="search"
                  placeholder="Search here.."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  style={{ borderRight: "0" }}
                />
                <InputGroup.Text>
                  {searchTerm.length >= 1 ? (
                    <AiFillCloseCircle
                      fontSize="20px"
                      onClick={() => {
                        searchBarFilterData("", true);
                        setSearchTerm("");
                        setActiveOriginId(null);
                        navigate(location?.pathname);
                      }}
                      style={{ cursor: "pointer" }}
                    />
                  ) : (
                    <AiOutlineSearch fontSize="20px" />
                  )}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </Form> */}
            {isLoading ? (
              <p className="filter_note">Loading...</p>
            ) : uniqueBrandsData?.length > 0 ? (
              <>
                <ul className="list-unstyled brands_list mb-0">
                  {uniqueBrandsData?.slice(0, brandsToShow)?.map((brand) => (
                    <li
                      key={brand?.id}
                      onClick={() => handleBrandClick(brand?.id, brand?.route)}
                      className={activeBrandId === brand?.id ? "active" : ""}
                    >
                      {brand?.name}
                      {/* <span>({brand?.product_count})</span> */}
                    </li>
                  ))}
                </ul>
                {brandsToShow < totalBrands ? (
                  <li className="show_more_less" onClick={handleShowMore}>
                    Show More <FaArrowDown />
                  </li>
                ) : totalBrands < 8 ? null : (
                  <li className="show_more_less" onClick={handleShowLess}>
                    Show Less <FaArrowUp />
                  </li>
                )}
                {brandsToShow >= totalBrands ? null : brandsToShow > 12 ? (
                  <li className="show_close mt-2" onClick={handleShowLess}>
                    Reset <FaWindowClose />
                  </li>
                ) : null}
              </>
            ) : (
              <p className="filter_note">No brand found!</p>
            )}
          </div>
          <div className="subcategory_list_wraper">
            <h3 data-aos="fade-down">
              Filter by {cat == "premium" ? "categories" : "sub-categories"}
            </h3>
            {isLoading ? (
              <p className="filter_note">Loading...</p>
            ) : uniqueCategoriesData?.length > 0 ? (
              <div className="subcategory_list">
                {uniqueCategoriesData?.map((subCat) => (
                  <button
                    key={subCat?.id}
                    type="button"
                    onClick={() => handleSubCatClick(subCat?.route)}
                    className={`btn filter-bn ${
                      subcat === subCat?.route ? "active" : ""
                    }`}
                    data-aos="fade-up"
                  >
                    {subCat?.name}
                  </button>
                ))}
              </div>
            ) : (
              <p className="filter_note">
                No {cat == "premium" ? "category" : "sub-category"} found!
              </p>
            )}
          </div>
          {cat == "wine" && (
            <div className="brands_list_wraper">
              <h3>Filter by origins</h3>
              {isLoading ? (
                <p className="filter_note">Loading...</p>
              ) : uniqueOriginsData?.length > 0 ? (
                <>
                  <ul className="list-unstyled brands_list">
                    {uniqueOriginsData
                      ?.slice(0, originsToShow)
                      ?.map((origin, i) => (
                        <li
                          key={i}
                          onClick={() => handleOriginClick(i, origin)}
                          className={activeOriginId === i ? "active" : ""}
                        >
                          {origin}
                        </li>
                      ))}
                  </ul>
                  {originsToShow < totalOrigins ? (
                    <li
                      className="show_more_less"
                      onClick={handleShowMoreOrigin}
                    >
                      Show More <FaArrowDown />
                    </li>
                  ) : totalOrigins < 8 ? null : (
                    <li
                      className="show_more_less"
                      onClick={handleShowLessOrigin}
                    >
                      Show Less <FaArrowUp />
                    </li>
                  )}
                  {originsToShow >= totalOrigins ? null : originsToShow > 10 ? (
                    <li
                      className="show_close mt-2"
                      onClick={handleShowLessOrigin}
                    >
                      Reset <FaWindowClose />
                    </li>
                  ) : null}
                </>
              ) : (
                <p className="filter_note">No origin found!</p>
              )}
            </div>
          )}
          <div className="price_range_wraper">
            <h3 data-aos="fade-down">Filter by price</h3>
            {/* <Slider
              range
              min={30}
              max={50000}
              value={rangeValues}
              onChange={handleRangeChange}
            /> */}
            {/* <div className="range-val" data-aos="fade-up">
              Price: AED {rangeValues[0]} — AED {rangeValues[1]}
            </div> */}
            <div className="range-val" data-aos="fade-up">
              Price:{" "}
              <input
                text
                value={rangeValues[0]}
                className="SliderInput"
                name="0"
                onChange={(e) => handleRangeCustomChange(e)}
              />{" "}
              —{" "}
              <input
                text
                value={rangeValues[1]}
                className="SliderInput"
                name="1"
                onChange={(e) => handleRangeCustomChange(e)}
              />{" "}
              AED
            </div>
            {israngeValues ? (
              <div>
                <button
                  className="btn primary_btn borderRadius_1 mt-3"
                  onClick={handleRangeFilter}
                >
                  Filter
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};
export default ShopFilters;
