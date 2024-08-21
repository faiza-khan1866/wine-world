import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
// import { FaShoppingBasket, FaExternalLinkAlt } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import DataLoader from "../Loader/DataLoader";

import Aos from "aos";
import "aos/dist/aos.css";
import useWishlist from "../../Hooks/useWishlist";

import ProductsList from "./ProductsList";

const ShopPageProducts = ({
  items,
  isLoading,
  selectedFilter,
  handleFilterChange,
  cat,
  handlePageClick,
  pageCount,
  toData,
  fromData,
  israngeValues,
  isFilter,
  isFilterV2,
  handlePageClickTest,
  filterpageCount,
  isPaginationLoading,
  currentPage,
}) => {
  const handleClickScroll = () => {
    const element = document.getElementById("products_list_21");
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const { getWishlistItems, GetWishlistData } = useWishlist();
  const [isAddToWishlist, setIsAddToWishlist] = useState(null);

  let wishlistItems = GetWishlistData();

  useEffect(() => {
    getWishlistItems();
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

  return (
    <>
      <div className="shop_top_bar">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <p>
            {isFilter
              ? `Showing ${currentPage + 1} out of ${filterpageCount} results`
              : isFilterV2
              ? `Showing ${currentPage + 1} out of ${filterpageCount} results`
              : items?.length > 0 && fromData && toData
              ? `Showing ${fromData} to ${toData} Results`
              : "Showing 0 results"}
          </p>
        )}
        <Form.Select
          className="sort_list"
          onChange={handleFilterChange}
          value={selectedFilter}
        >
          <option value="Default Sorting">Default Sorting</option>
          <option value="Latest">Latest</option>
          <option value="Price: High - Low">Price: High - Low</option>
          <option value="Price: Low - High">Price: Low - High</option>
        </Form.Select>
      </div>
      {isLoading ? (
        <DataLoader />
      ) : isPaginationLoading ? (
        <DataLoader />
      ) : items?.length > 0 ? (
        <ProductsList
          items={items}
          wishlistItems={wishlistItems}
          getWishlist={getWishlistItems}
          isAddToWishlist={isAddToWishlist}
          setIsAddToWishlist={setIsAddToWishlist}
        />
      ) : (
        <div className="py-5 mt-5 text-center">
          {cat == "others" || cat == "cigars" || cat == "liquor-chocolate" ? (
            <h3 className="comm_prod_note ">
              Keep an eye out! Our latest products will be arriving shortly.
            </h3>
          ) : (
            <p className="prod_note">No Product Found!</p>
          )}
        </div>
      )}
      {isFilter ? (
        <>
          <div className="pagination_style py-3">
            <ReactPaginate
              breakLabel="..."
              nextLabel={<FaAngleDoubleRight fontSize={15} />}
              previousLabel={<FaAngleDoubleLeft fontSize={15} />}
              pageRangeDisplayed={5}
              marginPagesDisplayed={2}
              renderOnZeroPageCount={null}
              onPageChange={handlePageClickTest}
              pageCount={filterpageCount}
              forcePage={currentPage}
            />
          </div>
        </>
      ) : isFilterV2 ? (
        <>
          <div className="pagination_style py-3">
            <ReactPaginate
              breakLabel="..."
              nextLabel={<FaAngleDoubleRight fontSize={15} />}
              previousLabel={<FaAngleDoubleLeft fontSize={15} />}
              pageRangeDisplayed={5}
              marginPagesDisplayed={2}
              renderOnZeroPageCount={null}
              onPageChange={handlePageClickTest}
              pageCount={filterpageCount}
              forcePage={currentPage}
            />
          </div>
        </>
      ) : (
        <>
          <>
            {items?.length > 0 ? (
              <div className="pagination_style py-3">
                <ReactPaginate
                  breakLabel="..."
                  nextLabel={<FaAngleDoubleRight fontSize={15} />}
                  pageCount={pageCount}
                  pageRangeDisplayed={5}
                  marginPagesDisplayed={2}
                  onPageChange={handlePageClick}
                  previousLabel={<FaAngleDoubleLeft fontSize={15} />}
                  renderOnZeroPageCount={null}
                  onClick={handleClickScroll}
                />
              </div>
            ) : null}
          </>
        </>
      )}
    </>
  );
};
export default ShopPageProducts;
