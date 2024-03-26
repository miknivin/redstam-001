import React, { useState } from "react";

const Modals = ({ isOpen, onRequestClose }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
    if (e.target.checked) {
      onRequestClose();
    }
  };

  return (
    <div>
      <>
        {isOpen && (
          <div className="fixed inset-0 z-[999999] overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4 text-center">
              <div
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                onClick={(e) => e.stopPropagation()}
              ></div>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div className="inline-block align-bottom bg-gray-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-gray-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 relative">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:mx-4 sm:text-left">
                      <div className="flex items-center">
                        <input
                          id="link-checkbox"
                          type="checkbox"
                          checked={isChecked}
                          onChange={handleCheckboxChange}
                          className="w-8 h-8 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="link-checkbox"
                          className="ms-2 text-lg font-medium text-gray-900 dark:text-gray-300"
                        >
                          I Confirm that I am above the age of 18.
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default Modals;
