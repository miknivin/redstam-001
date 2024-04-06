import React from "react";

const Modals = ({ isOpen, onRequestClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[999999] overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4 text-center \">
            <div
              className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            ></div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-gray-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
              <div className="bg-gray-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 relative">
                <button
                  class="btn btn-sm btn-circle text-white dark:text-white bg-slate-900 hover:bg-slate-700 absolute right-2 top-2"
                  onClick={onRequestClose}
                >
                  ✕
                </button>
                <div className="sm:flex sm:items-start justify-center">
                  <div className="mt-3 text-center sm:mt-0 sm:mx-4 sm:text-left">
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modals;
