import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Aos from "aos";
import "aos/dist/aos.css";
import SubpageBanner from "../components/common/SubpageBanner";
import ContactForm from "../components/Contact/ContactForm";
import { FaPhoneAlt, FaEnvelope, FaFax, FaWarehouse } from "react-icons/fa";
import bannerImg from "../images/banners/contactbanner.png";
import info from "../dbs/info.json";
import useWindowDimensions from "../Hooks/useWindowDimensions ";
import { HiMiniBuildingOffice2 } from "react-icons/hi2";
const Contact = () => {
  const { width } = useWindowDimensions();

  useEffect(() => {
    Aos.init({
      offset: 100,
      easing: "ease",
      delay: 0,
      once: true,
      duration: 800,
    });
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Helmet>
        <title>Contact | Royal Spirit</title>
        <meta name="description" content="Contact" />
        <link rel="canonical" href="https://royalspirit.ae/contact" />
      </Helmet>
      <SubpageBanner
        name="Contact"
        indexpage="Home"
        indexvisit="/"
        activepage="Contact"
        bgImg={bannerImg}
      />
      <section className="total-body sub-pages py-5 d-block">
        <div className="container">
          <div className="row ">
            <div className="col-lg-5">
              <div className="left-sec-div1 cm-text-n" data-aos="fade-up">
                <h6 className="">Let's talk</h6>
                <h2>We are here to help you</h2>
                <ul className="list-unstyled mt-4">
                  <li className="d-flex">
                    <span className="icon-c">
                      <FaPhoneAlt />
                    </span>
                    <span className="text-c">
                      Call Us
                      <small className="d-block">
                        <a href={`tel:${info?.phone_link}`}>{info?.phone}</a>
                      </small>
                    </span>
                  </li>
                  <li className="d-flex">
                    <span className="icon-c">
                      <FaEnvelope />
                    </span>
                    <span className="text-c">
                      Email:
                      <small className="d-block">
                        <a href="mailto:hello@royalspirit.ae">
                          hello@royalspirit.ae
                        </a>
                      </small>
                    </span>
                  </li>
                  <li className="d-flex">
                    <span className="icon-c">
                      <FaWarehouse />
                    </span>
                    <span
                      className="text-c"
                      style={{
                        width: "100%",
                      }}
                    >
                      WareHouse:
                      <small
                        className="d-block"
                        style={{
                          width: width < 480 ? "100%" : "50%",
                        }}
                      >
                        <a
                          href={info?.map_link}
                          target="__blank"
                          style={{
                            fontSize: "16px",
                          }}
                        >
                          {info?.address}
                        </a>
                      </small>
                    </span>
                  </li>
                  <li className="d-flex">
                    <span className="icon-c">
                      <HiMiniBuildingOffice2 />
                    </span>
                    <span
                      className="text-c"
                      style={{
                        width: "100%",
                      }}
                    >
                      Head Office:
                      <small
                        className="d-block"
                        style={{
                          width: width < 480 ? "100%" : "50%",
                        }}
                      >
                        <a
                          href={info?.store_map_link}
                          target="__blank"
                          style={{
                            fontSize: "16px",
                          }}
                        >
                          {info?.store_address}
                        </a>
                      </small>
                    </span>
                  </li>
                  {/* <li className="d-flex">
                    <span className="icon-c">
                      <FaFax />
                    </span>
                    <span className="text-c">
                      Fax:
                      <small className="d-block"> +990-123-4567 </small>
                    </span>
                  </li> */}
                </ul>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="contact-form-div" data-aos="fade-up">
                <h6 className="">Send us a message</h6>
                <h2>Fill the form below</h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Contact;
