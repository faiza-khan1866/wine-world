import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  createProductFilterData,
  // createProductSearchData,
} from "../../http/apiService";
import axios from "axios";
import debounce from "lodash/debounce";
import OurChoicesFilters from "./OurChoicesFilters";
import OurChoicesPageProducts from "./OurChoicesPageProducts";

const OurChoicesPageRight = ({
  products,
  loading,
  setLoading,
  shopDetails,
  handlePageChange,
  pageCount,
  toResult,
  fromResult,
  setFromResult,
  setToResult,
  originalProductData,
}) => {
  const { cat, subcat, choice } = useParams();
  const location = useLocation();

  const [productList, setProductList] = useState(products);
  const [selectedFilter, setSelectedFilter] = useState("Default Sorting");
  const [searchLastPage, setSearchLastPage] = useState(null);
  const [debouncedFetchData, setDebouncedFetchData] = useState(null);
  const axiosSource = axios.CancelToken.source();

  useEffect(() => {
    setProductList(products);
    // setSearchLastPage(null);
  }, [products]);

  //Set Last Path
  useEffect(() => {
    setSearchLastPage(null);
  }, [location.pathname]);

  useEffect(() => {
    if (debouncedFetchData) {
      fetchData(debouncedFetchData);
    }
  }, [debouncedFetchData]);

  const fetchData = async (formData) => {
    try {
      setLoading(true); // Show the loader
      const { data } = await createProductFilterData(formData, {
        cancelToken: axiosSource.token,
      });
      setProductList(
        data?.product?.data?.filter(
          (product) => product?.price_variation?.length > 0
        )
      );
      setSearchLastPage(data?.product?.last_page);

      setToResult(data?.product?.to);
      setFromResult(data?.product?.from);
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error("Error fetching Data:", error);
      }
    } finally {
      setLoading(false); // Hide the loader
    }
  };

  // Debounce the filter functions to prevent excessive API calls
  const debouncedFetchBrandFilterData = debounce(async (brandId) => {
    let formData = {
      category_id: cat,
      brand_id: brandId,
    };
    setDebouncedFetchData(formData);
  }, 300);

  const debouncedFetchOriginFilterData = debounce(async (originName) => {
    let formData = {
      category_id: cat,
      origin: originName,
    };

    setDebouncedFetchData(formData);
  }, 300);

  const debouncedFetchPriceFilterData = debounce(async (values) => {
    let formData = {
      category_id: cat,
      min: values[0],
      max: values[1],
    };
    setDebouncedFetchData(formData);
  }, 300);

  // sort by filter
  const handleFilterChange = (e) => {
    const selectedValue = e.target.value;

    const filterOptions = {
      "Default Sorting": originalProductData,
      Latest: filterByLatest,
      "Price: High - Low": sortByPriceHighToLow,
      "Price: Low - High": sortByPriceLowToHigh,
    };

    setSelectedFilter(selectedValue);
    const filteredProductsData = filterOptions[selectedValue]();
    setProductList([...filteredProductsData]);
  };

  const filterByLatest = () => {
    return [...originalProductData].sort((a, b) => {
      const dateA = new Date(a?.created_at);
      const dateB = new Date(b?.created_at);
      return dateB - dateA;
    });
  };

  const sortByPriceHighToLow = () => {
    return [...originalProductData].sort((a, b) => {
      const priceA = a.price_variation?.[0]?.price || 0;
      const priceB = b.price_variation?.[0]?.price || 0;
      return priceB - priceA;
    });
  };

  const sortByPriceLowToHigh = () => {
    return [...originalProductData].sort((a, b) => {
      const priceA = a.price_variation?.[0]?.price || 0;
      const priceB = b.price_variation?.[0]?.price || 0;
      return priceA - priceB;
    });
  };

  // // filter search bar

  // const fetchSearchFormData = async (searchTerm, NoSearchQuery) => {
  //   if (NoSearchQuery) {
  //     setProductList(products);
  //     setSearchLastPage(null);
  //     return;
  //   }
  //   let formData = {
  //     category_id: cat,
  //     query: searchTerm,
  //   };
  //   try {
  //     setLoading(true); // Show the loader
  //     const response = await createProductSearchData(formData);

  //     if (response && response?.data) {
  //       setProductList(response?.data?.product?.data);
  //       setSearchLastPage(response?.data?.product?.last_page);
  //       setToResult(response?.data?.product?.to);
  //       setFromResult(response?.data?.product?.from);
  //     } else {
  //       console.error("Invalid response format:", response);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   } finally {
  //     setLoading(false); // Hide the loader
  //   }
  // };

  return (
    <>
      <div className="view-group ">
        <div className="list-wrapper">
          {shopDetails && (
            <div className="shop_top_details" id="products_list_21">
              <h2 dangerouslySetInnerHTML={{ __html: shopDetails?.title }} />
              <p
                dangerouslySetInnerHTML={{
                  __html: shopDetails?.description,
                }}
              />
            </div>
          )}
          <div className="row">
            <div className="col-lg-3 col-md-4 col-12">
              <OurChoicesFilters
                priceFilterData={debouncedFetchPriceFilterData}
                originFilterData={debouncedFetchOriginFilterData}
                // searchBarFilterData={fetchSearchFormData}
                brandFilterData={debouncedFetchBrandFilterData}
                cat={cat}
                subcat={subcat}
                choice={choice}
                handlePageChange={handlePageChange}
              />
            </div>
            <div className="col-lg-9 col-md-8 col-12">
              <OurChoicesPageProducts
                items={productList}
                isLoading={loading}
                selectedFilter={selectedFilter}
                handleFilterChange={handleFilterChange}
                cat={cat}
                handlePageClick={handlePageChange}
                pageCount={searchLastPage ? searchLastPage : pageCount}
                toData={toResult}
                fromData={fromResult}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default OurChoicesPageRight;
