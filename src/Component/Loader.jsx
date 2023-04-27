import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
const Loader = ({ loading }) => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <ClipLoader
        color={"#000"}
        loading={loading}
        size={80}
        cssOverride={true}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
