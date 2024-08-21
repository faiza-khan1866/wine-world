import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
// import Aboutsec1img from "../../images/about/aboutsec1.png";

const ContactMap = () => {
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
      <div className="contact-map-sec pt-5">
        {/* <div className="container-fluid p-0" style={{ overflowX: "hidden" }}>
          <div className="row g-0">
            <div className="col-12 col-lg-6 col-md-6 map-bg-img">
              <div className="contact_details">
                <h6 data-aos="fade-down">
                   Connect with Royal Spirit
                </h6>
                <h2 data-aos="fade-down">Together in Every Toast</h2>
                <p data-aos="fade-up">
                  For queries, compliments, or a casual chat about the finest
                  spirits, we're all ears.
                </p>
                <ul className="list-unstyled" data-aos="fade-up">
                  <li>
                    <a href="https://g.co/kgs/k8oRpx" target="_blank">
                      Get Google map Directions
                    </a>
                  </li>
                  <li>
                    <a href="tel:+971569812858">Call Us: +971 (5) 69812858</a>
                  </li>
                  <li>
                    <a href="mailto:hello@royalspirit.ae">
                      Email: hello@royalspirit.ae
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-6 col-12 col-lg-6 col-md-6">
              <div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3632.844616635908!2d54.45383927423084!3d24.421465162685447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e4353a495431d%3A0xdab72fbcec941a0f!2sMillennium%20Al%20Rawdah%20Hotel!5e0!3m2!1sen!2s!4v1692106867034!5m2!1sen!2s"
                  width="100%"
                  height="450"
                  style={{ border: "0" }}
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div> */}
        <div className="container">
          <div className="row row-cols-1">
            {/* <div className="col">
              <figure data-aos="fade-up">
                <img src={Aboutsec1img} alt="about" />
              </figure>
            </div> */}
            <div className="col">
              <div className="contact_bottom">
                <h6>About Royal Spirit</h6>
                <h2 data-aos="fade-down">
                  Discover the best online liquor store in Abu Dhabi: Royal
                  Spirit
                </h2>
                <p className="subtitle" data-aos="fade-up">
                  Your Premier Destination for Alcohol and Liquor Shopping in
                  UAE.
                </p>
                <p data-aos="fade-up">
                  Royal Spirit stands as the premier online alcohol shop in Abu
                  Dhabi, setting the gold standard as the first-of-its kind
                  luxury concept store in the UAE. With an expansive portfolio
                  boasting over 1000 wine & fine wine labels, and 700+ spirits
                  brands, we are the go-to online alcohol store in Abu Dhabi for
                  both connoisseurs and social drinkers.
                </p>
                <p data-aos="fade-up">
                  Our dedication to authenticity, quality, and unparalleled
                  customer service has solidified our reputation as the best
                  place to buy liquor online in the region. Conveniently
                  situated on Abu Dhabi's Airport Road, we offer both local and
                  international customers easy access to our vast collection.
                </p>
                <p data-aos="fade-up">
                  Experience a seamless online shopping journey with our
                  state-of-the-art design and plush lounge-like ambience,
                  ensuring every visit feels like a luxury experience. We take
                  immense pride in being the top online alcohol shop in Abu
                  Dhabi and the #1 super distributor in the region. From
                  vineyard to your table, every drop we deliver speaks of
                  authenticity.
                </p>
                <p data-aos="fade-up">
                  For those seeking home delivery liquor options, our online
                  platform caters to all your needs. So, when you think of
                  ordering alcohol online in Abu Dhabi, remember Royal Spirit is
                  just a click away. Dive in, order liquor online, and cheers to
                  luxury, authenticity, and the finest spirits!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ContactMap;
