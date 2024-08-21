import React from "react";
import { NavLink } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import useWindowDimensions from "../../Hooks/useWindowDimensions ";

const SubpageBanner = ({
  bgImg,
  bgImgMbl,
  name,
  indexvisit,
  indexpage,
  activepage,
}) => {
  const { width } = useWindowDimensions();

  return (
    <>
      <div
        className="subpage-banner d-flex justify-content-center align-items-center"
        style={{
          background: `url(${
            width > "480" ? bgImg : bgImgMbl ? bgImgMbl : bgImg
          })`,
        }}
      >
        <div className="container">
          <div className="sub-page-content pt-0 pt-lg-5 ">
            <h1
              className="text-center"
              dangerouslySetInnerHTML={{ __html: name }}
            />
            <ul className="list-unstyled d-flex justify-content-center align-items-center">
              <li>
                <NavLink to={indexvisit}> {indexpage} </NavLink>
              </li>
              <li>
                <FaAngleRight />
              </li>
              <li dangerouslySetInnerHTML={{ __html: activepage }} />
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default SubpageBanner;
