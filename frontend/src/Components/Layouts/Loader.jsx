import React from "react";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-base-200">
      <span className="loading loading-ring w-32 text-red-700"></span>
    </div>
  );
};

export default Loader;
