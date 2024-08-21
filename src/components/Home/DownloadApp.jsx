import Aos from "aos";
import React, { useEffect } from "react";
import appStore from "../../images/icons/app-store.jpg";
import googleStore from "../../images/icons/google-play.jpg";

const DownloadApp = () => {
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
      <div
        className="download_app_sec download_app_sec3 pt-5"
        data-aos="fade-top"
      >
        <div className="download_app_icons">
          <a
            href="https://apps.apple.com/app/royalspirit/id6475167410"
            target="_blank"
            rel="nofollow"
          >
            <img
              fetchpriority="low"
              src={appStore}
              className="img-fluid"
              width={150}
              height={50}
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
              className="img-fluid ms-3"
              width={150}
              height={50}
              alt="googleStore"
            />
          </a>
        </div>
      </div>
    </>
  );
};
export default DownloadApp;
