import React, { useEffect } from "react";
import CheckoutSteps from "./CheckOutSteps";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/features/cartSlice";

const OrderPlaced = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);

    // Dispatch the clearCart action when the component mounts
    dispatch(clearCart());
  }, [dispatch]); //

  return (
    <div>
      <div className="sticky top-20 z-10 w-full bg-gray-900 rounded-box mx-auto">
        <CheckoutSteps shipping confirmOrder orderPlaced />
      </div>
      <div className="bg-gray-900 h-screen">
        <div className="bg-base-300 p-6  md:mx-auto">
          <svg
            viewBox="0 0 24 24"
            className="text-green-600 w-16 h-16 mx-auto my-6"
          >
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg>
          <div className="text-center">
            <h3 className="md:text-2xl text-base font-semibold text-center">
              Order Placed
            </h3>
            <p className=" my-2">Thank you for completing your order.</p>
            <p> Have a great day!</p>
            <div className="py-10 text-center">
              <a
                href="/"
                className="px-12 bg-green-600 hover:bg-green-500 text-white font-semibold py-3"
              >
                GO BACK
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPlaced;
