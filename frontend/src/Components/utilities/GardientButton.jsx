import React from "react";

const GardientButton = ({ text }) => {
  return (
    <>
      <button
        type="button"
        class="px-5 py-3 text-white bg-gradient-to-r from-red-600 via-red-700 to-pink-900 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-pink-800 font-medium rounded-lg text-center"
      >
        {text}
      </button>
    </>
  );
};

export default GardientButton;
