import React, { useState, useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import product from "../../images/products/product.webp";

const ProductsLeftCarasoule = ({ sliderImages }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (sliderImages) {
      const newImages = sliderImages?.map((x) => ({
        original: x ? process.env.REACT_APP_IMAGE_BASE_URL + x : product,
        thumbnail: x ? process.env.REACT_APP_IMAGE_BASE_URL + x : product,
      }));
      setImages(newImages);
    }
  }, [sliderImages]);

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
      <div className="products-slide-1">
        <ImageGallery
          items={images}
          showPlayButton={false}
          showFullscreenButton={false}
          showNav={false}
          originalHeight={250}
        />
      </div>
    </>
  );
};
export default ProductsLeftCarasoule;
