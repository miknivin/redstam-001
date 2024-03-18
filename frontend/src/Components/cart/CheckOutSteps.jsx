import React from "react";
import { Link } from "react-router-dom";

const CheckoutSteps = ({ shipping, confirmOrder, methodState,orderPlaced }) => {
  return (
    <div className="checkout-progress flex justify-center mx-auto items-center p-4 bg-gray-900">
      <ul className="steps steps-horizontal font-light text-xs md:text-sm">
        <li className={`step ${shipping ? "step-success" : ""}`}>Shipping</li>
        <li className={`step ${confirmOrder ? "step-success" : ""}`}>
          Confirm Order
        </li>
        <li className={`step ${methodState === "Card" ? "step-success" : ""}`}>
          Payment
        </li>
        <li className={`step ${methodState === "cod"||orderPlaced ? "step-success" : ""}`}>
          Order Placed
        </li>
      </ul>
    </div>
  );
};

export default CheckoutSteps;
