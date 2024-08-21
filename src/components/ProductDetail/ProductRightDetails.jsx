import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Aos from "aos";
import "aos/dist/aos.css";
import { FaShoppingBasket } from "react-icons/fa";
import { BsHeart } from "react-icons/bs";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";
import Count from "../common/Count";
import useCart from "../../Hooks/useCart";
import useWishlist from "../../Hooks/useWishlist";
import { useNavigate } from "react-router-dom";

const ProductRightDetails = ({ productDetail, category }) => {
  const navigate = useNavigate();
  const user_type = useSelector((state) => state.user.User_Data.user_type);
  const userId = useSelector((state) => state.user.User_Data.user_id);
  const { addtoCart } = useCart();
  const { addtoWishlist } = useWishlist();
  const [variationsData, setVariationsData] = useState([]);
  const [variationsList, setVariationsList] = useState();
  const [variationsListAll, setVariationsAllList] = useState();
  //updates
  const [activeVariationsValue, setActiveVariationsValue] = useState();
  const [newactiveVariationsValue, setNewActiveVariationsValue] = useState();

  const [activeVariation, setActiveVariation] = useState({});
  const [newactiveVariation, setnewActiveVariation] = useState({});

  let [count, setCount] = useState(1);

  useEffect(() => {
    if (productDetail?.price_variation) {
      setVariationsData(productDetail?.price_variation);
      setActiveVariation(productDetail?.price_variation[0]);
      setnewActiveVariation(productDetail?.price_variation[0]);
      setNewActiveVariationsValue(productDetail?.price_variation[0]?.id);
      let variations = {};
      let activeVariation = {};
      productDetail?.price_variation?.forEach((variaton, index) => {
        let name = variaton["variation"]["name"];
        let value = variaton["values"]["name"];
        if (variations[name]) {
          if (!variations[name]?.includes(value)) {
            variations[name]?.push(value);
          }
        } else {
          variations[name] = [value];
          if (index == 0) {
            activeVariation[name] = value;
          }
        }
      });
      setVariationsList(variations);
      setActiveVariationsValue(activeVariation);
    }
  }, [productDetail]);

  const handleVariationChange = (value) => {
    const selectedVariation = productDetail?.price_variation?.find(
      (variation) => variation?.values?.name === value
    );
    setActiveVariation(selectedVariation);
    // Update the activeVariationsValue state with the name of the selected variation and its value
    setActiveVariationsValue((prevValue) => ({
      ...prevValue,
      [selectedVariation?.variation?.name]: value,
    }));
  };
  const handleVariationChangeNew = (value) => {
    const selectedVariation = productDetail?.price_variation?.find(
      (variation) => variation?.id === value
    );

    setnewActiveVariation(selectedVariation);
    // Update the activeVariationsValue state with the name of the selected variation and its value
    setNewActiveVariationsValue(value);
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
      <div className="menu-dl-right">
        <h2 dangerouslySetInnerHTML={{ __html: productDetail?.name }} />
        <h3>
          AED{" "}
          {newactiveVariation?.discount_price !== 0
            ? new Intl.NumberFormat().format(newactiveVariation?.discount_price)
            : newactiveVariation?.offer_price !== 0
            ? new Intl.NumberFormat().format(newactiveVariation?.offer_price)
            : new Intl.NumberFormat().format(newactiveVariation?.price)}{" "}
          {newactiveVariation?.discount_price !== 0 ||
          newactiveVariation?.offer_price !== 0 ? (
            <span className="old-pice text-decoration-line-through">
              AED {new Intl.NumberFormat().format(newactiveVariation?.price)}
            </span>
          ) : (
            ""
          )}
        </h3>
        <h5>
          Availability:{" "}
          {newactiveVariation?.stock == "0" ? (
            <span className="text-danger">Out Of Stock</span>
          ) : (
            <span className="text-success">In Stock</span>
          )}
        </h5>
        <p
          dangerouslySetInnerHTML={{ __html: productDetail?.short_description }}
        />
        {/* {activeVariation?.pack_of && (
          <>
            <h5>Pack Of</h5>
            <p>{activeVariation?.pack_of}</p>
          </>
        )} */}

        {/* <h5 data-aos="fade-up"> Choose Your Size </h5> */}
        <div className="sel-size mb-3">
          {/* <div
            className="btn-group"
            role="group"
            aria-label="Basic checkbox toggle button group"
          >
            {variationsList &&
              Object.keys(variationsList)?.map((variationName, i) => (
                <React.Fragment key={i}>
                  <h5 className="mt-2">Choose {variationName}</h5>
                  {variationsList[variationName]?.map((v, j) => (
                    <React.Fragment key={j}>
                      <input
                        type="checkbox"
                        className="btn-check"
                        id={`btncheck${i}-${j}`}
                        autoComplete="off"
                        checked={
                          activeVariationsValue[variationName] == v &&
                          "selected"
                        }
                        onChange={() => handleVariationChange(v)}
                      />
                      <label
                        className="btn btn-outline-primary"
                        htmlFor={`btncheck${i}-${j}`}
                      >
                        {v}
                      </label>
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ))}
          </div> */}
          <div
            className="btn-group"
            role="group"
            aria-label="Basic checkbox toggle button group"
          >
            {productDetail?.price_variation &&
              productDetail?.price_variation?.map((variationName, i) => (
                <React.Fragment key={i}>
                  {i == 0 ? (
                    <h5 className="mt-2">
                      Choose {variationName?.variation?.name}
                    </h5>
                  ) : null}

                  <React.Fragment>
                    <input
                      type="checkbox"
                      className="btn-check"
                      id={`btncheck${i}`}
                      autoComplete="off"
                      checked={
                        variationName?.id == newactiveVariationsValue &&
                        "selected"
                      }
                      onChange={() =>
                        handleVariationChangeNew(variationName?.id)
                      }
                    />
                    {!variationName?.variation?.name
                      ?.toLowerCase()
                      ?.includes("pack of") ? (
                      <label
                        className="btn btn-outline-primary"
                        htmlFor={`btncheck${i}`}
                      >
                        {variationName?.values?.name}{" "}
                        {variationName?.pack_of !== ""
                          ? `Pack Of ${variationName?.pack_of}`
                          : null}
                      </label>
                    ) : (
                      <label
                        className="btn btn-outline-primary"
                        htmlFor={`btncheck${i}`}
                      >
                        {variationName?.pack_of !== ""
                          ? `Pack Of ${variationName?.pack_of}`
                          : null}
                      </label>
                    )}
                  </React.Fragment>
                </React.Fragment>
              ))}
          </div>
        </div>
        {user_type == "corporate" ? (
          ""
        ) : (
          <>
            {newactiveVariation?.stock == "0" ? (
              ""
            ) : (
              <>
                <h5> Select Your Quantity </h5>
                <div className="col-4">
                  <Count
                    isInnerProduct={true}
                    count={count}
                    setCount={setCount}
                    stock={newactiveVariation?.stock}
                  />
                </div>
              </>
            )}

            <div className="mt-4 cart-bn-ds-wrape">
              <button
                className="btn cart-bn-ds borderRadius_1"
                onClick={() => {
                  let formData = {
                    user_id: userId,
                    product_id: newactiveVariation?.product_id,
                    product_variation_id: newactiveVariation?.variation_id,
                    product_value_id: newactiveVariation?.variation_value_id,
                    qty: count,
                  };
                  addtoCart(formData);
                }}
                disabled={newactiveVariation?.stock == "0" ? true : false}
              >
                <FaShoppingBasket className="cart_icon" />
                Add to Cart
              </button>
              <button
                className="btn wish-bn-ds borderRadius_1"
                onClick={() => {
                  let formData = {
                    user_id: userId,
                    product_id: newactiveVariation?.product_id,
                    product_variation_id: newactiveVariation?.variation_id,
                    product_value_id: newactiveVariation?.variation_value_id,
                  };
                  addtoWishlist(formData);
                }}
              >
                <BsHeart className="cart_icon" />
                Add to Wishlist
              </button>
            </div>
          </>
        )}

        <h5 className="mt-4">Share This :</h5>
        <ul className="list-unstyled share-links mt-3">
          <li>
            <FacebookShareButton
              url={`https://royalspirit.ae/product/${productDetail?.route}`}
              quote={productDetail?.name}
              hashtag="#RoyalSpirit"
            >
              <FacebookIcon
                size={30}
                round={true}
                bgStyle={{ fill: "#ccc" }}
                iconFillColor="#444"
              />
            </FacebookShareButton>
            <TwitterShareButton
              url={`https://royalspirit.ae/product/${productDetail?.route}`}
              title={productDetail?.name}
              hashtags={["RoyalSpirit", "Product"]}
            >
              <TwitterIcon
                size={30}
                round={true}
                bgStyle={{ fill: "#ccc" }}
                iconFillColor="#444"
              />
            </TwitterShareButton>
            <LinkedinShareButton
              url={`https://royalspirit.ae/product/${productDetail?.route}`}
              title={productDetail?.name}
              summary={productDetail?.short_description}
            >
              <LinkedinIcon
                size={30}
                round={true}
                bgStyle={{ fill: "#ccc" }}
                iconFillColor="#444"
              />
            </LinkedinShareButton>
            <WhatsappShareButton
              url={`https://royalspirit.ae/product/${productDetail?.route}`}
              title={productDetail?.name}
            >
              <WhatsappIcon
                size={30}
                round={true}
                bgStyle={{ fill: "#ccc" }}
                iconFillColor="#444"
              />
            </WhatsappShareButton>
          </li>
        </ul>
      </div>
    </>
  );
};
export default ProductRightDetails;
