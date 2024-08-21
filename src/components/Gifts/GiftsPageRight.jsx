import React, { useState, useEffect } from "react";
import { createGiftProductFilterData } from "../../http/apiService";
import GiftsPageProducts from "./GiftsPageProducts";
import GiftsFilters from "./GiftsFilters";
import axios from "axios";
import debounce from "lodash/debounce";

const GiftsPageRight = ({
  products,
  category,
  loading,
  setLoading,
  categories,
}) => {
  const [productList, setProductList] = useState(products);
  const [selectedFilter, setSelectedFilter] = useState("Default Sorting");

  const [debouncedFetchData, setDebouncedFetchData] = useState(null);
  const axiosSource = axios.CancelToken.source();

  useEffect(() => {
    setProductList(products);
  }, [products]);

  useEffect(() => {
    if (debouncedFetchData) {
      fetchData(debouncedFetchData);
    }
  }, [debouncedFetchData]);

  const fetchData = async (formData) => {
    try {
      setLoading(true); // Show the loader
      const { data } = await createGiftProductFilterData(formData, {
        cancelToken: axiosSource.token,
      });
      setProductList(
        data?.product?.filter((product) => product?.price_variation?.length > 0)
      );
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error("Error fetching Data:", error);
      }
    } finally {
      setLoading(false); // Hide the loader
    }
  };

  // Debounce the filter functions to prevent excessive API calls
  const debouncedFetchCatFilterData = debounce(async (catRoute) => {
    let formData = {
      gift_route: category,
      category_route: catRoute,
    };
    setDebouncedFetchData(formData);
  }, 300);

  const debouncedFetchPriceFilterData = debounce(async (values) => {
    let formData = {
      gift_route: category,
      min: values[0],
      max: values[1],
    };
    setDebouncedFetchData(formData);
  }, 300);

  // sort by filter
  const handleFilterChange = (e) => {
    const selectedValue = e.target.value;

    const filterOptions = {
      "Default Sorting": productList,
      Latest: filterByLatest,
      "Price: High - Low": sortByPriceHighToLow,
      "Price: Low - High": sortByPriceLowToHigh,
    };

    const filteredProductsData = filterOptions[selectedValue]();
    setProductList([...filteredProductsData]);
  };

  const filterByLatest = () => {
    return [...productList].sort((a, b) => {
      const dateA = new Date(a?.created_at);
      const dateB = new Date(b?.created_at);
      return dateB - dateA;
    });
  };

  const sortByPriceHighToLow = () => {
    return [...productList].sort((a, b) => {
      const priceA = a.price_variation?.[0]?.price || 0;
      const priceB = b.price_variation?.[0]?.price || 0;
      return priceB - priceA;
    });
  };

  const sortByPriceLowToHigh = () => {
    return [...productList].sort((a, b) => {
      const priceA = a.price_variation?.[0]?.price || 0;
      const priceB = b.price_variation?.[0]?.price || 0;
      return priceA - priceB;
    });
  };

  return (
    <>
      <div className="view-group ">
        <div className="list-wrapper">
          <div className="row">
            <div className="col-lg-3 col-md-4 col-12">
              <GiftsFilters
                cat={category}
                priceFilterData={debouncedFetchPriceFilterData}
                catFilterData={debouncedFetchCatFilterData}
                giftCategories={categories}
                isLoading={loading}
              />
            </div>
            <div className="col-lg-9 col-md-8 col-12">
              <GiftsPageProducts
                items={productList}
                isLoading={loading}
                selectedFilter={selectedFilter}
                handleFilterChange={handleFilterChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default GiftsPageRight;
