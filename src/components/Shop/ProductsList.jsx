import React, { memo } from "react";

import { useParams } from "react-router-dom";

import ProductSingle from "./ProductSingle";

function ProductsList({
  items,
  wishlistItems,
  isAddToWishlist,
  setIsAddToWishlist,
}) {
  const { cat } = useParams();

  return (
    <>
      {" "}
      <div className="row  gy-4 gx-lg-2 mt-0">
        {items?.map((curElem) => (
          <div
            className={`${
              cat == "sale"
                ? "col-6 col-md-4 col-lg-2"
                : "col-6 col-md-6 col-lg-3"
            }`}
            key={curElem?.id}
          >
            <ProductSingle
              curElem={curElem}
              wishlistItems={wishlistItems}
              isAddToWishlist={isAddToWishlist}
              setIsAddToWishlist={setIsAddToWishlist}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default memo(ProductsList);
