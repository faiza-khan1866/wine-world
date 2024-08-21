import React, { useEffect, useState } from "react";
import ProductDetailStop from "./ProductDetailStop";
import RelatedProductsSlider from "./RelatedProductsSlider";
import { useInView } from "react-intersection-observer";

const ProductsDetailsBody = ({
  productData,
  relatedProducts,
  catRoute,
  activepage,
  indexpage,
  indexvisit,
}) => {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
    triggerOnce: true,
  });
  return (
    <>
      <section className="total-body sub-pages py-5 d-block">
        <ProductDetailStop
          activepage={activepage}
          product={productData}
          catRoute={catRoute}
          indexpage={indexpage}
          indexvisit={indexvisit}
        />
        <div ref={ref}>
          {inView ? (
            <>
              {relatedProducts?.length > 0 && (
                <RelatedProductsSlider similarProducts={relatedProducts} />
              )}
            </>
          ) : null}
        </div>
      </section>
    </>
  );
};
export default ProductsDetailsBody;
