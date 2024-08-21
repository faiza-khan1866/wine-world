// import React, { useEffect, useState } from "react";
// import { lazy, Suspense } from "react";

// import { toast } from "react-toastify";
// import { useDispatch, useSelector } from "react-redux";
// import { Col, Form, Row, InputGroup } from "react-bootstrap";
// // import homebannerImg from "../../images/banners/homebanner.png";
// // import homebannerImgMin from "../../images/banners/BANNER.webp";
// // import homebannerImgMbl from "../../images/banners/BannerMobile.webp";
// import { homeBannerLocationData } from "../../appRedux/actions/cartAction";
// import { useNavigate } from "react-router-dom";
// import { useRef } from "react";
// // import { NavLink } from "react-router-dom";
// import useWindowDimensions from "../../Hooks/useWindowDimensions ";
// import bg from "../../images/banners/banner.webp";
// import bgMbl from "../../images/banners/bannermobile.webp";
// // import AutoCompleteComp from "../Checkout/AutoCompleteComp";
// const AutoCompleteComp = lazy(() => import("../Checkout/AutoCompleteComp"));

// const HomeBanner = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const isUserLogIn = useSelector((state) => state.user.isUser);
//   const videoRef = useRef(null);
//   const { width } = useWindowDimensions();

//   const [shipType, setShipType] = useState("pickup");
//   const [curretVideo, setCurrentVideo] = useState(
//     "https://prismcloudhosting.com/video.mp4"
//   );

//   const handleClick = (val) => {
//     setShipType(val);
//   };

//   const homeBillingData = {
//     shipping_type: "pickup",
//     gift: 0,
//     country: "",
//     address_line1: "",
//   };
//   const [formValues, setFormValues] = useState(homeBillingData);
//   const [loading, setLoading] = useState(false);
//   const [changeElt, setChangeElt] = useState(false);

//   const handleInputChange = (e) => {
//     setFormValues({
//       ...formValues,
//       [e.target.name]: e.target.value,
//       country: "Abu Dhabi",
//     });
//   };

//   const handleInputAddressChange = (value, latLong) => {
//     setFormValues({
//       ...formValues,
//       address_line1: value,
//       latLong: latLong,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     let updatedData = { ...formValues, shipping_type: shipType };
//     if (!isUserLogIn) {
//       toast.warn("Please Login to Search.", {
//         autoClose: 3000,
//         theme: "dark",
//       });
//       return;
//     } else if (shipType === "") {
//       toast.warn("Please Choose Shipping Type.", {
//         autoClose: 3000,
//         theme: "dark",
//       });
//       return;
//     } else if (shipType === "delivery") {
//       if (formValues?.address_line1 === "") {
//         toast.warn("Please Enter Location.", {
//           autoClose: 3000,
//           theme: "dark",
//         });
//         return;
//       }
//     } else if (shipType === "pickup") {
//       if (formValues?.country === "") {
//         toast.warn("Please Select Your Nearest Store.", {
//           autoClose: 3000,
//           theme: "dark",
//         });
//         return;
//       }
//     }

//     setLoading(true);
//     dispatch(homeBannerLocationData(updatedData));
//     setLoading(false);
//     navigate("/checkout");
//   };

//   const autoPlay = () => {
//     setTimeout(() => {
//       if (videoRef.current) {
//         const video = videoRef.current;
//         video.play();
//       }
//     }, 12000);
//   };
//   useEffect(() => {
//     autoPlay();
//   }, []);
//   useEffect(() => {
//     setTimeout(() => {
//       setChangeElt(true);
//     }, 5000);
//   }, []);
//   return (
//     <>
//       {/* <NavLink to="/shop/spirit"> */}
//       <div className="banner-part">
//         {/* Video element as the background */}
//         {changeElt ? (
//           <>
//             <video
//               fetchpriority="high"
//               ref={videoRef}
//               playsInline
//               webkit-playsInline
//               // autobuffer
//               preload="auto"
//               // autoplay
//               loop
//               muted
//               id="video_background"
//               className="banner_video"
//               poster={width < "480" ? bgMbl : bg}
//               src={curretVideo}
//               height={840}
//               width={380}
//             >
//               Your browser does not support the video tag.
//             </video>
//           </>
//         ) : (
//           <img
//             id="video_background"
//             className="banner_video"
//             fetchpriority="high"
//             src={width < "480" ? bgMbl : bg}
//             height={840}
//             width={380}
//           />
//         )}

//         {/* <source
//             type="video/mp4"
//           /> */}

//         {/* Add content you want to display on top of the video */}
//         <div className="container">
//           {/* <div className="banner-content"> */}
//           {/* <h4 data-aos="fade-up" className="text-center">
//             Your Gateway
//           </h4>
//           <h2 data-aos="fade-down" className="text-center mb-4">
//             To the World's
//             <span className="d-block">Most Exquisite Liquors.</span>
//           </h2>*/}
//           {/* <h2 data-aos="fade-up" className="text-center mb-4">
//               TRY ALCOHOL DELIVERY WITH <br />{" "}
//               <div style={{ height: "20px" }}></div> <span>ROYAL SPIRIT</span>
//             </h2> */}
//           {/* <h2 data-aos="fade-up" className="text-center mb-4">
//                 Unbeatable deals on <span>Premium</span> Spirits
//               </h2> */}

//           {/*   <p>
//             Sip, savor, and celebrate with our curated collection of wines,
//             spirits, and beers. Dive into luxury, one bottle at a time.
//           </p> */}
//           {/* <div className="desk_banner_form_wrape"> */}
//           {/* <Form className="banner-form">
//               <Row className="justify-content-center">
//                 <Col sm={12}>
//                   <div className="banner_btn_wrape"> */}
//           {/* <div>
//                     <button
//                       type="button"
//                       className="btn select_as_btn borderRadius_1"
//                       onClick={() => handleClick("pickup")}
//                     >
//                       Store Pick Up
//                     </button>
//                   </div>
//                   <div>
//                     <button
//                       type="button"
//                       className="btn select_as_btn2 borderRadius_1"
//                       onClick={() => handleClick("delivery")}
//                     >
//                       Delivery
//                     </button>
//                   </div> */}
//           {/* <div>
//                       <NavLink
//                         to="/shop/spirit"
//                         className="btn shop-now-btn borderRadius_1"
//                         style={{ width: "maxContent" }}
//                       >
//                         Shop Now
//                       </NavLink>
//                     </div> */}
//           {/* <div>
//                     <Form.Group controlId="shipping_type">
//                       <Form.Control
//                         as="select"
//                         name="country"
//                         value={formValues?.country}
//                         onChange={handleInputChange}
//                         className="select_as_btn"
//                       >
//                         <option value="">Store Pick Up</option>
//                         <option value="Abu Dhabi">Abu Dhabi</option>
//                       </Form.Control>
//                     </Form.Group>
//                   </div> */}

//           {/* <Form.Group controlId="shipping_type" className="mb-2">
//                     <Form.Control
//                       as="select"
//                       name="country"
//                       value={formValues?.country}
//                       onChange={handleInputChange}
//                       className="select_as_btn2"
//                     >
//                       <option value="">Delivery</option>
//                       <option value="Abu Dhabi">Abu Dhabi</option>
//                     </Form.Control>
//                   </Form.Group> */}
//           {/* </div>
//                 </Col>
//               </Row>
//             </Form> */}

//           {/* </div> */}
//           {/* </div> */}
//           <div className="banner-content banner-contentUpdated">
//             <div className="delivery_loc_wrapper">
//               {/* <h4 data-aos="fade-up">Your Gateway</h4>
//               <h2 data-aos="fade-down" className=" mb-4">
//                 To the World's
//                 <span className="d-block">Most Exquisite Liquors.</span>
//               </h2>
//               <p>
//                 Sip, savor, and celebrate with our curated collection of wines,
//                 spirits, and beers. Dive into luxury, one bottle at a time.
//               </p> */}
//               <h4> Best Online Liquor Store in Abu Dhabi</h4>
//               <h2 className=" mb-4">Your Gateway to Exquisite Spirits</h2>
//               <Form className="banner-form banner-form_loc">
//                 <Row>
//                   <Col xs={12}>
//                     <Form.Group controlId="shipping_type" className="mb-2">
//                       <Form.Check
//                         className=" pointerCursor"
//                         type="radio"
//                         name="shipping_type"
//                         inline
//                         label="Store Pick Up"
//                         value="pickup"
//                         onChange={(e) => {
//                           handleInputChange(e);
//                           handleClick(e.target.value);
//                         }}
//                         checked={formValues?.shipping_type == "pickup"}
//                       />
//                       <Form.Check
//                         className=" pointerCursor"
//                         type="radio"
//                         name="shipping_type"
//                         inline
//                         label="Delivery"
//                         value="delivery"
//                         onChange={(e) => {
//                           handleInputChange(e);
//                           handleClick(e.target.value);
//                         }}
//                         checked={formValues?.shipping_type == "delivery"}
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col xs={12}>
//                     {shipType == "pickup" && (
//                       <InputGroup className="px-2">
//                         <Form.Label for="store_location"></Form.Label>
//                         <Form.Control
//                           as="select"
//                           name="store_location"
//                           value={formValues?.store_location}
//                           onChange={handleInputChange}
//                         >
//                           <option value="">Select Your Nearest Store</option>
//                           <option value="Royal Spirit, Millennium Al Rawdah Hotel,  1778 Sheikh Rashid Bin Saeed Street, Al Rawdah, Abu Dhabi.">
//                             Royal Spirit, Millennium Al Rawdah Hotel, Abu Dhabi.
//                           </option>
//                         </Form.Control>
//                         <InputGroup.Text
//                           onClick={handleSubmit}
//                           disabled={loading ? true : false}
//                         >
//                           {loading ? "Searching..." : "Search"}
//                         </InputGroup.Text>
//                       </InputGroup>
//                     )}
//                     <Suspense fallback={""}>
//                       {shipType == "delivery" && (
//                         <AutoCompleteComp
//                           handleInputAddressChange={handleInputAddressChange}
//                           handleSubmit={handleSubmit}
//                           loadingSearch={loading}
//                         />
//                       )}
//                     </Suspense>
//                     {/* {shipType == "delivery" && (
//                       <InputGroup className=" px-2" data-aos="fade-up">
//                         <Form.Control
//                           type="text"
//                           name="address_line1"
//                           value={formValues?.address_line1}
//                           onChange={handleInputChange}
//                           placeholder="Enter Your Location"
//                         />
//                         <InputGroup.Text
//                           onClick={handleSubmit}
//                           disabled={loading ? true : false}
//                         >
//                           {loading ? "Searching..." : "Search"}
//                         </InputGroup.Text>
//                       </InputGroup>
//                     )} */}
//                   </Col>
//                 </Row>
//               </Form>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* </NavLink> */}
//     </>
//   );
// };

// export default HomeBanner;

import React, { useMemo } from "react";
import { Carousel } from "react-bootstrap";
import useWindowDimensions from "../../Hooks/useWindowDimensions ";
import banner1Mobile from "../../images/banners/banner-170524-1-mobile.webp";
import banner1 from "../../images/banners/banner-170524-1.webp";
import banner2Mobile from "../../images/banners/banner-170524-2-mobile.webp";
import banner2 from "../../images/banners/banner-170524-2.webp";
import banner3Mobile from "../../images/banners/banner-170524-3-mobile.webp";
import banner3 from "../../images/banners/banner-170524-3.webp";
import "./HomeBanner.css";
import { Helmet } from "react-helmet";

const mobileBanners = [
  {
    src: banner1Mobile,
    alt: "bannerMobile1",
  },
  {
    src: banner2Mobile,
    alt: "bannerMobile2",
  },
  {
    src: banner3Mobile,
    alt: "bannerMobile3",
  },
];

const desktopBanners = [
  {
    src: banner1,
    alt: "banner1",
  },
  {
    src: banner2,
    alt: "banner2",
  },
  {
    src: banner3,
    alt: "banner3",
  },
];

const HomeBanner = () => {
  const { width } = useWindowDimensions();

  const isSmallScreen = width < 480;

  const banners = useMemo(() => {
    return isSmallScreen ? mobileBanners : desktopBanners;
  }, [isSmallScreen]);

  const interval = 3000; // 3 seconds

  return (
    <>
      <Helmet>
        <link
          rel="preload"
          fetchpriority="high"
          as="image"
          href={banner1Mobile}
          type="image/webp"
        ></link>
      </Helmet>
      <div className="home-banner">
        <Carousel className="home-banner__carousel" controls={false} wrap touch>
          {banners.map((banner, i) => (
            <Carousel.Item
              key={banner.alt}
              className="banner_video"
              interval={i == 0 ? 5500 : interval}
            >
              <img
                id={banner.alt}
                fetchpriority={i == 0 ? "high" : "low"}
                className="home-banner__image img-fluid"
                alt={banner.alt}
                src={banner.src}
                width={isSmallScreen ? "390px" : "1530px"}
                height={isSmallScreen ? "570px" : "600px"}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default HomeBanner;
