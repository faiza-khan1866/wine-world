import React from "react";
import appStore from "../images/icons/app-store.jpg";
import googleStore from "../images/icons/google-play.jpg";
import qrCode from "../images/icons/qr_code.png";
import SearchBar from "./SearchBar";

const TopAppSec = ({ searchMobile }) => {
  return (
    <div className="top_app_sec pt-2  pb-md-2 pt-md-2">
      <div className="container">
        <div className="d-flex flex-row justify-content-center align-items-center flex-wrap gap-3 searchbar-icon">
          <p className="DeliveryText">
            {/* Royal Spirit in your pocket. */}
            {/* <span className="curveStyle">
              {" "}
              {/* DOWNLOAD OUR APP & GET <span className="OffPer"> 20% </span>OFF */}
            {/* Get free delivery on order above{" "} */}
            {/* <span className="OffPer"> AED 100 </span> */}
            {/* </span> */}
          </p>
          <div className="Desk_viewSearch">
            {" "}
            <SearchBar />
          </div>
          <div className="searchbar-icon pb-3 mobileSearch">
            {" "}
            {searchMobile && <SearchBar />}
          </div>
          {/* <div className="top_app_icons">
            <a href="https://apps.apple.com/app/royalspirit/id6475167410" target="_blank">
            <img src={appStore} className="img-fluid" loading="lazy" />
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.prismDigital.royalsprit" target="_blank">
            <img src={googleStore} className="img-fluid" loading="lazy" />
            </a>
            <img
              src={qrCode}
              className="img-fluid"
              style={{ width: "36px" }}
              loading="lazy"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default TopAppSec;
