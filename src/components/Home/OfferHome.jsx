import React from "react";
import { toast } from "react-toastify";
import useWindowDimensions from "../../Hooks/useWindowDimensions ";
import offer1 from "../../images/homeoffers/offer-170524-1.webp";
import offer2 from "../../images/homeoffers/offer-170524-2.webp";
import offer3Mbl from "../../images/homeoffers/offer-170524-3-mobile.webp";
import offer3 from "../../images/homeoffers/offer-170524-3.webp";
import offer4Mbl from "../../images/homeoffers/offer-170524-4-mobile.webp";
import offer4 from "../../images/homeoffers/offer-170524-4.webp";
import appStore from "../../images/icons/app-store.jpg";
import googleStore from "../../images/icons/google-play.jpg";
import "./OfferHome.css";

const OfferHome = () => {
  const { width } = useWindowDimensions();

  function copyTextToClipboard() {
    const textToCopy = "ROYALSPIRIT30";

    const textArea = document.createElement("textarea");

    textArea.value = textToCopy;

    document.body.appendChild(textArea);

    textArea.select();

    document.execCommand("copy");

    document.body.removeChild(textArea);

    toast.success("Text copied to clipboard: " + textToCopy, {
      autoClose: 3000,
      theme: "dark",
    });
  }

  return (
    <div className="top-offer-div-sec pt-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="row row-cols-1 row-cols-md-2 gy-4 gy-lg-0 gx-lg-4 justify-content-between align-items-center">
              <div className="col">
                <div
                  className="comon-offer"
                  style={{ cursor: "pointer" }}
                  onClick={copyTextToClipboard}
                >
                  <figure>
                    <img
                      fetchpriority="low"
                      src={offer2}
                      alt="bg"
                      loading="lazy"
                      className="OfferMr2"
                      width={416}
                      height={200}
                    />
                  </figure>
                </div>
              </div>

              <div className="col">
                <div className="comon-offer">
                  <figure>
                    <img
                      fetchpriority="low"
                      src={offer1}
                      alt="bg"
                      loading="lazy"
                      width={416}
                      height={200}
                      style={{
                        objectPosition: "right",
                      }}
                    />
                  </figure>
                </div>
              </div>
            </div>

            <div className="big-div-offer mb-4 mb-lg-0 mt-4">
              <div className="comon-offer">
                <figure>
                  <img
                    fetchpriority="low"
                    src={offer4}
                    alt="bg"
                    loading="lazy"
                    className="DeskImgBanner"
                    width={856}
                    height={200}
                  />

                  <img
                    fetchpriority="low"
                    src={offer4Mbl}
                    alt="bg"
                    loading="lazy"
                    className="mobileImgBanner"
                    width={296}
                    height={200}
                    style={{
                      objectPosition: "left",
                    }}
                  />
                </figure>
              </div>
            </div>
          </div>

          <div className="col-lg-4 offer-home__download-image">
            <div
              className={`${
                width < "480" ? "comon-offer" : "comon-offer height-offer"
              } `}
            >
              <figure>
                <img
                  fetchpriority="low"
                  src={offer3}
                  alt="bg"
                  loading="lazy"
                  className="DeskImgBanner"
                  width={415}
                  height={424}
                  style={{
                    objectPosition: "left",
                  }}
                />

                <img
                  fetchpriority="low"
                  src={offer3Mbl}
                  alt="bg"
                  loading="lazy"
                  className="mobileImgBanner"
                  width={296}
                  height={200}
                />
              </figure>
            </div>

            <div className="offer-home__download-image-buttons">
              <a
                href="https://apps.apple.com/app/royalspirit/id6475167410"
                target="_blank"
                rel="nofollow"
              >
                <img
                  fetchpriority="low"
                  src={appStore}
                  className="img-fluid d-block OfferStoreLogo"
                  loading="lazy"
                  width={120}
                  height={40}
                  alt="appStore"
                />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.prismDigital.royalsprit"
                target="_blank"
                rel="nofollow"
              >
                <img
                  fetchpriority="low"
                  src={googleStore}
                  className="img-fluid mt-md-2 d-block OfferStoreLogo"
                  loading="lazy"
                  width={120}
                  height={40}
                  alt="googleStore"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OfferHome;
