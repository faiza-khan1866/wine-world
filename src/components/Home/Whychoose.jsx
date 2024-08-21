import React, { useState, useEffect } from "react";
import HomeApi from "../apidata/HomeApi";
import Aos from "aos";
import "aos/dist/aos.css";

const Whychoose = () => {
  const [workData, setworkData] = useState(HomeApi?.whychosedetails);

  useEffect(() => {
    setworkData(HomeApi?.whychosedetails);
  }, [HomeApi?.whychosedetails]);

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
      <div className="offer-div-sec py-5">
        <div className="container">
          <h2 className="text-center mb-5 text-white" data-aos="fade-up">
            The royal distinction
          </h2>
          <div className="row row-cols-1 row-cols-md-2 gy-4 gy-lg-0 gx-lg-4 row-cols-md-2 row-cols-lg-4">
            {workData.map((curElem) => {
              const { id, img, title, description } = curElem;
              return (
                <>
                  <div className="col" data-aos="fade-down" key={id}>
                    <div className="comon-our-text text-center">
                      <figure>
                        <img src={img} alt={title} loading="lazy" />
                      </figure>
                      <h5 className="text-white"> {title} </h5>
                      <p className="text-white">{description}</p>
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
export default Whychoose;
