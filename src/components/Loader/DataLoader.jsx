import React, { memo } from "react";
import PuffLoader from "react-spinners/PuffLoader";

const DataLoader = (props) => {
  return (
    <div
      className={`d-flex justify-content-center align-items-center ${
        !props?.pd && "py-5"
      }`}
    >
      <PuffLoader color={"#821a1a"} size={props?.size ? props?.size : 60} />
    </div>
  );
};
export default memo(DataLoader);
