import React, { useEffect, useRef } from "react";
import ProductsLeftCarasoule from "./ProductsLeftCarasoule";
import ProductRightDetails from "./ProductRightDetails";
import ProductsComment from "./ProductsComment";
import { NavLink } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";

const ProductDetailStop = ({
  product,
  catRoute,
  activepage,
  indexpage,
  indexvisit,
}) => {
  const currentPage = useRef(null);

  const executeScroll = () => {
    currentPage?.current?.scrollIntoView();
  };
  useEffect(() => {
    executeScroll();
  }, [currentPage?.current]);
  return (
    <div className="products-details-sec" ref={currentPage}>
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
        <div className="row row-cols-1 row-cols-md-2">
          <div className="col-sm-12">
            <ProductsLeftCarasoule sliderImages={product?.slider_images} />
          </div>
          <div className="col-sm-12">
            <ProductRightDetails productDetail={product} category={catRoute} />
          </div>
        </div>
        <ProductsComment productDetail={product} />
      </div>
    </div>
  );
};

export default ProductDetailStop;
