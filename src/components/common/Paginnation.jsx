import React, { useEffect, useState } from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

const Paginnation = ({ showPerPage, onchangepagination, total }) => {
  const [counter, setCounter] = useState(1);
  const [numberOfButtons, setNumberOfButoons] = useState(
    Math.ceil(total / showPerPage)
  );

  useEffect(() => {
    const value = showPerPage * counter;
    onchangepagination(value - showPerPage, value);
  }, [counter]);
  const onclickButton = (type) => {
    if (type === "pre") {
      if (counter === 1) {
        setCounter(1);
      } else {
        setCounter(counter - 1);
      }
    } else if (type === "next") {
      if (numberOfButtons === counter) {
        setCounter(counter);
      } else {
        setCounter(counter + 1);
      }
    }
  };
  return (
    <div>
      <nav aria-label="...">
        <ul className="pagination justify-content-center mt-5">
          <li className="page-item">
            <a className="page-link" onClick={() => onclickButton("pre")}>
              <FaAngleDoubleLeft fontSize={15} />
            </a>
          </li>

          {new Array(numberOfButtons).fill("").map((el, index) => (
            <li
              className={`page-items ${
                index + 1 === counter ? "active" : null
              }`}
            >
              <a className="page-link" onClick={() => setCounter(index + 1)}>
                {index + 1}
              </a>
            </li>
          ))}

          <li className="page-item">
            <a className="page-link" onClick={() => onclickButton("next")}>
              <FaAngleDoubleRight fontSize={15} />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Paginnation;
