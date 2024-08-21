import React from "react";
import user from "../../images/testimonials-1-1.jpg";

const CommentSection = ({ commentsList }) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return (
    <>
      <div className="comment-sec-part">
        <h2> Comments </h2>
        <div className="all-cm-div mt-4">
          {commentsList?.map((curElem) => (
            <div
              className="comon-comnet-sec d-lg-flex"
              key={curElem?.id}
              data-aos="fade-up"
            >
              <figure>
                <img src={user} alt="usernames" />
              </figure>
              <div className="user-cmn">
                <h5 className="d-flex align-items-center text-capitalize">
                  {curElem?.name}
                  <span>
                    {" "}
                    {new Date(curElem?.created_at)?.toLocaleDateString(
                      "en-US",
                      options
                    )}
                  </span>
                </h5>
                <p> {curElem?.message} </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default CommentSection;
