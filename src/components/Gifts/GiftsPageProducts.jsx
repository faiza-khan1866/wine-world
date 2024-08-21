import React, { useState, useEffect } from "react";
import product from "../../images/products/product.webp";
import { Form } from "react-bootstrap";
// import { FaShoppingBasket, FaExternalLinkAlt } from "react-icons/fa";
import { BsHeart } from "react-icons/bs";
import Paginnation from "../common/Paginnation";
import DataLoader from "../Loader/DataLoader";
import { NavLink, useNavigate } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";

const GiftsPageProducts = ({
  items,
  isLoading,
  selectedFilter,
  handleFilterChange,
}) => {
  const navigate = useNavigate();
  const [showPerPgae, setShowPerPage] = useState(9);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPgae,
  });
  const onchangepagination = (start, end) => {
    setPagination({ start: start, end: end });
  };

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
        <p>Showing all {items?.length} results</p>
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
      ) : items?.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 gy-5 gx-lg-5 mt-0">
          {items?.slice(pagination.start, pagination.end)?.map((curElem) => (
            <div className="col" data-aos="fade-down" key={curElem?.id}>
              <div className="produc-div">
                <div className="products-box">
                  {curElem?.price_variation?.[0]?.discount_price ||
                  curElem?.price_variation?.[0]?.offer_price ? (
                    <div className="offer-text-div">
                      {(
                        ((curElem?.price_variation?.[0]?.price -
                          (curElem?.price_variation?.[0]?.discount_price ||
                            curElem?.price_variation?.[0]?.offer_price)) /
                          curElem?.price_variation?.[0]?.price) *
                        100
                      ).toFixed(2)}{" "}
                      %
                    </div>
                  ) : null}
                  <div className="wish_prod_icon">
                    <BsHeart />
                  </div>
                  <figure
                    onClick={() =>
                      navigate(
                        `/product/${curElem?.route}`
                      )
                    }
                  >
                    <img
                      src={
                        curElem?.featured_img
                          ? process.env.REACT_APP_IMAGE_BASE_URL +
                            curElem?.featured_img
                          : product
                      }
                      alt="pic"
                    />
                  </figure>
                  {/* <div
                    className="hover-show-bn"
                    onClick={() =>
                      navigate(
                        `/product/${curElem?.category?.route}/${curElem?.route}`
                      )
                    }
                  >
                    <NavLink
                      to={`/product/${curElem?.category?.route}/${curElem?.route}`}
                      className="comon-hv-bn"
                    >
                      <FaExternalLinkAlt />
                    </NavLink>
                  </div> */}
                </div>

                <div className="ps-details text-center">
                  {/* <p className="cate-text d-table text-center m-auto">
                    {curElem?.category?.name}
                  </p> */}
                  <p className="brand-tite d-table text-center m-auto">
                    {curElem?.brands?.name}
                  </p>
                  <NavLink
                    to={`/product/${curElem?.route}`}
                    className="products-titel m-auto"
                    dangerouslySetInnerHTML={{ __html: curElem?.name }}
                  ></NavLink>
                  {curElem?.price_variation?.length > 0 && (
                    <div className="d-flex align-items-center justify-content-center gap-1">
                      <h5 className="price-text">
                        AED{" "}
                        {curElem?.price_variation?.[0]?.discount_price !== 0
                          ? new Intl.NumberFormat().format(
                              curElem?.price_variation?.[0]?.discount_price
                            )
                          : curElem?.price_variation?.[0]?.offer_price !== 0
                          ? new Intl.NumberFormat().format(
                              curElem?.price_variation?.[0]?.offer_price
                            )
                          : new Intl.NumberFormat().format(
                              curElem?.price_variation?.[0]?.price
                            )}
                      </h5>
                      {curElem?.price_variation?.[0]?.discount_price !== 0 ||
                      curElem?.price_variation?.[0]?.offer_price !== 0 ? (
                        <h5 className="old-pice text-decoration-line-through">
                          AED{" "}
                          {new Intl.NumberFormat().format(
                            curElem?.price_variation?.[0]?.price
                          )}
                        </h5>
                      ) : (
                        ""
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="prod_note py-5">No Product Found!</p>
      )}

      {items?.length >= showPerPgae && (
        <Paginnation
          showPerPage={showPerPgae}
          onchangepagination={onchangepagination}
          total={items?.length}
        />
      )}
    </>
  );
};
export default GiftsPageProducts;
