import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  createProductFilterData,
  createProductFilterTestData,
  fetchProductCategoryProductList,
  fetchProductHighToLowData,
  fetchProductLowToHighData,
  // createProductSearchData,
} from "../../http/apiService";
import ShopPageProducts from "./ShopPageProducts";
import ShopFilters from "./ShopFilters";
import axios from "axios";
import debounce from "lodash/debounce";

const ShopPageRight = ({
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
  const { cat, subcat } = useParams();
  const location = useLocation();
  const pageCurrentRef = useRef();
  const [productList, setProductList] = useState(products);
  const [productListoriginal, setProductListOriginal] = useState(
    structuredClone(products)
  );
  const [selectedFilter, setSelectedFilter] = useState("Default Sorting");
  const [searchLastPage, setSearchLastPage] = useState(null);
  const [debouncedFetchData, setDebouncedFetchData] = useState(null);
  const axiosSource = axios.CancelToken.source();
  const [items, setitems] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const [isDefaultPrds, setisDefaultPrds] = useState(true);
  const [isFilterV2, setisFilterV2] = useState(false);
  const [isPaginationLoading, setIsPaginationLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  // pagination testin start
  let itemsPerPage = 12;
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;

  const currentItems = useMemo(() => {
    let itemsList = items.slice(itemOffset, endOffset);
    return itemsList;
  }, [items, itemOffset]);

  const filterpageCount = Math.ceil(items.length / itemsPerPage);
  const TotalItem = items.length;

  //

  const ListViewScroll = () => {
    pageCurrentRef?.current?.scrollIntoView();
  };
  const handlePageClickTest = (event) => {
    setIsPaginationLoading(true);
    setCurrentPage(event?.selected);
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
    setIsPaginationLoading(false);
    ListViewScroll();
  };
  // pagination testin end

  useEffect(() => {
    setProductList(structuredClone(products));
    setProductListOriginal(structuredClone(products));
    setSelectedFilter("Default Sorting");
    setIsFilter(false);
    // setisDefaultPrds(true);
    setisFilterV2(false);
    // setSearchLastPage(null);
  }, [products, subcat, cat]);

  useEffect(() => {
    setisDefaultPrds(true);
  }, [subcat]);

  //Set Last Path
  useEffect(() => {
    setSearchLastPage(null);
    setSelectedFilter("Default Sorting");
    setIsFilter(false);
    // setisDefaultPrds(true);
    setisFilterV2(false);
  }, [location.pathname]);

  useEffect(() => {
    if (debouncedFetchData) {
      setisDefaultPrds(false);
      // fetchData(debouncedFetchData);
      fetchTestData(debouncedFetchData);
    }
  }, [debouncedFetchData]);

  const fetchData = async (formData) => {
    try {
      setLoading(true); // Show the loader
      const response = await createProductFilterData(formData, {
        cancelToken: axiosSource.token,
      });
      let newData = structuredClone(response?.data);
      let updatedData = response?.data?.product?.data?.filter(
        (product) => product?.price_variation?.length > 0
      );
      setProductList(structuredClone(updatedData));
      setSearchLastPage(structuredClone(newData?.product?.last_page));

      setToResult(structuredClone(newData?.product?.to));
      setFromResult(structuredClone(newData?.product?.from));
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error("Error fetching Data:", error);
      }
    } finally {
      setLoading(false); // Hide the loader
    }
  };

  const fetchTestData = async (formData) => {
    console.log("🚀 ~ fetchTestData ~ formData:", formData);
    try {
      setisDefaultPrds(false);
      setLoading(true); // Show the loader
      const response = await createProductFilterTestData(formData, {
        cancelToken: axiosSource.token,
      });
      let newData = structuredClone(response?.data);
      let updatedData = newData?.product?.filter(
        (product) => product?.price_variation?.length > 0
      );
      console.log("🚀 ~ fetchTestData ~ updatedData:", updatedData);

      setitems(structuredClone(updatedData));
      setProductList(structuredClone(updatedData));
      setProductListOriginal(structuredClone(updatedData));
      setSelectedFilter("Default Sorting");
      setIsFilter(true);
    } catch (error) {
      setisDefaultPrds(true);
      if (!axios.isCancel(error)) {
        console.error("Error fetching Data:", error);
      }
    } finally {
      setLoading(false); // Hide the loader
    }
  };

  const fatchPriceSort = async (selectedFilter) => {
    try {
      setLoading(true); // Show the loader

      const response = await fetchProductCategoryProductList(
        subcat ? `${cat}/${subcat}` : cat
      );
      let newData = structuredClone(response?.data);
      let updatedData = newData?.product?.filter(
        (product) => product?.price_variation?.length > 0
      );
      let updatedDataSort = updatedData?.filter((product) =>
        product?.price_variation?.sort((a, b) => {
          const priceA =
            a?.discount_price !== 0
              ? Number(a?.discount_price)
              : a?.offer_price !== 0
              ? Number(a?.offer_price)
              : Number(a?.price);
          const priceB =
            b?.discount_price !== 0
              ? Number(b?.discount_price)
              : b?.offer_price !== 0
              ? Number(b?.offer_price)
              : Number(b?.price);

          return priceA - priceB;
        })
      );

      if (selectedFilter?.includes("Low - High")) {
        console.log("Low - High condition");
        let SortedItems = await updatedDataSort?.sort((a, b) => {
          const priceA =
            a?.price_variation?.[0]?.discount_price !== 0
              ? Number(a?.price_variation?.[0]?.discount_price)
              : a?.price_variation?.[0]?.offer_price !== 0
              ? Number(a?.price_variation?.[0]?.offer_price)
              : Number(a?.price_variation?.[0]?.price);
          const priceB =
            b?.price_variation?.[0]?.discount_price !== 0
              ? Number(b?.price_variation?.[0]?.discount_price)
              : b?.price_variation?.[0]?.offer_price !== 0
              ? Number(b?.price_variation?.[0]?.offer_price)
              : Number(b?.price_variation?.[0]?.price);

          return priceA - priceB;
        });
        setitems(structuredClone(SortedItems));
        setProductList(structuredClone(SortedItems));
        setProductListOriginal(structuredClone(SortedItems));

        setCurrentPage(0);
        setItemOffset(0);
        setisFilterV2(true);
        // setSelectedFilter("Default Sorting");
      } else if (selectedFilter?.includes("High - Low")) {
        console.log("High - Low condition");
        let SortedItems = await updatedDataSort?.sort((a, b) => {
          const priceA =
            a?.price_variation?.[0]?.discount_price !== 0
              ? Number(a?.price_variation?.[0]?.discount_price)
              : a?.price_variation?.[0]?.offer_price !== 0
              ? Number(a?.price_variation?.[0]?.offer_price)
              : Number(a?.price_variation?.[0]?.price);
          const priceB =
            b?.price_variation?.[0]?.discount_price !== 0
              ? Number(b?.price_variation?.[0]?.discount_price)
              : b?.price_variation?.[0]?.offer_price !== 0
              ? Number(b?.price_variation?.[0]?.offer_price)
              : Number(b?.price_variation?.[0]?.price);
          return priceB - priceA;
        });
        setitems(structuredClone(SortedItems));
        setProductList(structuredClone(SortedItems));
        setProductListOriginal(structuredClone(SortedItems));

        setCurrentPage(0);
        setItemOffset(0);
        setisFilterV2(true);

        // setSelectedFilter("Default Sorting");
      } else if (selectedFilter?.includes("Latest")) {
        console.log("Latest");
        let SortedItems = updatedData?.sort((a, b) => {
          const dateA = new Date(a?.created_at);
          const dateB = new Date(b?.created_at);
          return dateB - dateA;
        });
        setitems(structuredClone(SortedItems));
        setProductList(structuredClone(SortedItems));
        setCurrentPage(0);
        setItemOffset(0);
        setisFilterV2(true);

        // setSelectedFilter("Default Sorting");
      } else {
        console.log("default");
        setitems(structuredClone(updatedData));
        setProductList(structuredClone(updatedData));
        setProductListOriginal(structuredClone(updatedData));

        setCurrentPage(0);
        setItemOffset(0);
        setisFilterV2(true);

        // setSelectedFilter("Default Sorting");
      }
    } catch (error) {
      setIsFilter(false);

      console.log("🚀 ~ fatchPriceSort ~ error:", error);
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
    setDebouncedFetchData(structuredClone(formData));
  }, 300);

  // sort by filter
  const handleFilterChange = async (e) => {
    const selectedValue = e.target.value;
    setSelectedFilter(selectedValue);
    if (isDefaultPrds) {
      await fatchPriceSort(selectedValue);
      return;
    }

    const filterOptions = {
      "Default Sorting": defaultFilter,
      Latest: filterByLatest,
      "Price: High - Low": sortByPriceHighToLow,
      "Price: Low - High": sortByPriceLowToHigh,
    };
    const filteredProductsData = filterOptions[selectedValue]();

    if (isFilter) {
      setitems([...filteredProductsData]);
      setCurrentPage(0);
      setItemOffset(0);
      return;
    }
    setProductList([...filteredProductsData]);
  };
  const defaultFilter = () => {
    return [...productListoriginal];
  };
  const filterByLatest = () => {
    return [...productList].sort((a, b) => {
      const dateA = new Date(a?.created_at);
      const dateB = new Date(b?.created_at);
      return dateB - dateA;
    });
  };

  const sortByPriceHighToLow = () => {
    console.log("sorty High TO lOw", isFilter);
    return [...productList].sort((a, b) => {
      const priceA =
        a?.price_variation?.[0]?.discount_price !== 0
          ? Number(a?.price_variation?.[0]?.discount_price)
          : a?.price_variation?.[0]?.offer_price !== 0
          ? Number(a?.price_variation?.[0]?.offer_price)
          : Number(a?.price_variation?.[0]?.price) || 0;
      const priceB =
        b?.price_variation?.[0]?.discount_price !== 0
          ? Number(b?.price_variation?.[0]?.discount_price)
          : b?.price_variation?.[0]?.offer_price !== 0
          ? Number(b?.price_variation?.[0]?.offer_price)
          : Number(b?.price_variation?.[0]?.price) || 0;
      return priceB - priceA;
    });
  };

  const sortByPriceLowToHigh = () => {
    // return [...originalProductData].sort((a, b) => {
    //   const priceA = a.price_variation?.[0]?.price || 0;
    //   const priceB = b.price_variation?.[0]?.price || 0;
    //   return priceA - priceB;
    // });

    return [...productList].sort((a, b) => {
      const priceA =
        a?.price_variation?.[0]?.discount_price !== 0
          ? Number(a?.price_variation?.[0]?.discount_price)
          : a?.price_variation?.[0]?.offer_price !== 0
          ? Number(a?.price_variation?.[0]?.offer_price)
          : Number(a?.price_variation?.[0]?.price) || 0;
      const priceB =
        b?.price_variation?.[0]?.discount_price !== 0
          ? Number(b?.price_variation?.[0]?.discount_price)
          : b?.price_variation?.[0]?.offer_price !== 0
          ? Number(b?.price_variation?.[0]?.offer_price)
          : Number(b?.price_variation?.[0]?.price) || 0;
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
        <div className="list-wrapper prodctScrollPadding" ref={pageCurrentRef}>
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
            {cat == "promotion" ? null : (
              <div className="col-lg-3 col-md-4 col-12">
                <ShopFilters
                  priceFilterData={debouncedFetchPriceFilterData}
                  originFilterData={debouncedFetchOriginFilterData}
                  // searchBarFilterData={fetchSearchFormData}
                  brandFilterData={debouncedFetchBrandFilterData}
                  cat={cat}
                  subcat={subcat}
                  handlePageChange={handlePageChange}
                />
              </div>
            )}

            <div
              className={`${
                cat == "promotion" ? "col-12 " : "col-lg-9 col-md-8 col-12 "
              }`}
            >
              <ShopPageProducts
                items={
                  isFilter
                    ? currentItems
                    : isFilterV2
                    ? currentItems
                    : productList
                }
                isLoading={loading}
                selectedFilter={selectedFilter}
                handleFilterChange={handleFilterChange}
                cat={cat}
                handlePageClick={handlePageChange}
                pageCount={searchLastPage ? searchLastPage : pageCount}
                toData={toResult}
                fromData={fromResult}
                handlePageClickTest={handlePageClickTest}
                filterpageCount={filterpageCount}
                isFilter={isFilter}
                isFilterV2={isFilterV2}
                isPaginationLoading={isPaginationLoading}
                currentPage={currentPage}
                TotalItem={TotalItem}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ShopPageRight;
