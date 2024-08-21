import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import Aboutsec1img from "../../images/about/aboutus-01.jpg";

const AboutWelcome = () => {
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
      <div className="about-sec-1 py-5 sub-pages">
        <div className="container overflow-hidden">
          <div className="row row-cols-1 row-cols-lg-2 gx-5">
            <div className="col">
              <figure data-aos="fade-up">
                <img src={Aboutsec1img} alt="about" />
              </figure>
            </div>
            <div className="col">
              <div data-aos="fade-down">
                <h6>A legacy of distinction</h6>
                <h2>Embracing Traditions, Crafting Excellence</h2>
                <p className="mt-3 ">
                  At Royal Spirit, our journey began with a simple yet profound
                  vision: To bring the world's finest liquors to discerning
                  enthusiasts. From exquisite vintage wines to rare spirits and
                  excellent brew, our collection is a testament to our
                  commitment to quality and diversity.
                </p>
                <p>
                  Every bottle in our portfolio carries with it a story of
                  heritage, meticulous craftsmanship, and a passion for the art
                  of distillation and brewing. Dive into our curated range and
                  experience the rich tapestry of flavors and traditions we've
                  brought together.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AboutWelcome;
