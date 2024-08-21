import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import giftType from "../../images/109076-cypruswine-Cyprus-Maratheftiko-Shiraz-wine-748x549.jpg";
import Aos from "aos";
import "aos/dist/aos.css";
import DataLoader from "../Loader/DataLoader";

const GiftsOffer = ({ giftTypesList, isLoading }) => {
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
      <div className="gifts_offer_sec">
        <div className="container">
          <h2 className="main-title">
            Every Occasion Deserves a Touch of Royal Spirit
          </h2>
          <p className="detail">
            From birthdays to anniversaries, corporate events to intimate
            gatherings, every occasion has its unique essence. At Royal Spirit,
            we've handpicked perfect beverage selections for each of these
            moments. Dive into our range, and find the ideal accompaniment to
            your celebrations, ensuring they're not just memorable but also
            truly special.
          </p>
          {isLoading ? (
            <DataLoader />
          ) : (
            <div className="row gy-4">
              {giftTypesList?.map((item, i) => (
                <div
                  className={`${
                    i == 0 || i == 3 || i == 4
                      ? "col-lg-8 col-12 col-md-6"
                      : "col-lg-4 col-12 col-md-6"
                  }`}
                  data-aos="fade-up"
                  key={item?.id}
                >
                  <NavLink to={`/gift/${item?.route}`} className="comon-offer">
                    <figure>
                      <img
                        src={
                          item?.featured_img
                            ? process.env.REACT_APP_IMAGE_BASE_URL +
                              item?.featured_img
                            : giftType
                        }
                        alt="bg"
                      />
                    </figure>
                    <h5 className="col-lg-11 m-auto">
                      <span className="d-block">{item?.name}</span>
                    </h5>
                  </NavLink>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default GiftsOffer;
