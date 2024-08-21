import React, { useState, useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import aboutChoose from "../apidata/AboutChooseApi";

const AboutChoose = () => {
  const [workData, setworkData] = useState(aboutChoose);
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
      <div className="About-client-sec py-5">
        <div className="container">
          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-3">
            {workData.map((curElem) => {
              const { id, img, title, number } = curElem;
              return (
                <>
                  <div className="col" key={id}>
                    <div className="comon-about text-center" data-aos="fade-up">
                      <figure className="comon-about-iocn">
                        <img src={img} alt="wine" />
                      </figure>
                      <h2 className="mt-2">{number}</h2>
                      <h5> {title} </h5>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default AboutChoose;
