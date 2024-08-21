import React from "react";
import user from "../../images/testimonials-1-1.jpg";

const CoustomerReview = ({ reviews }) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return (
    <>
      {reviews?.map((curElem) => {
        return (
          <>
            <div className="comment-user-div" key={curElem?.id}>
              <div className="userp">
                <div className="us-pic">
                  <img src={user} alt="user"/>
                </div>
              </div>
              <div className="user-dsl">
                <h6>
                  {curElem?.name}{" "}
                  <span className="d-block mt-2">
                    {new Date(curElem?.created_at)?.toLocaleDateString(
                      "en-US",
                      options
                    )}
                  </span>
                </h6>
                <p> {curElem?.message} </p>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};
export default CoustomerReview;
