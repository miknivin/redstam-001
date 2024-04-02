import React from "react";

const CheckoutSteps = ({
  shipping,
  confirmOrder,
  methodState,
  orderPlaced,
}) => {
  return (
    <div className="checkout-progress flex justify-center mx-auto items-center p-4 bg-base-200 dark:bg-gray-900">
      <ul className="steps steps-horizontal font-light text-xs md:text-sm text-gray-950 dark:text-gray-50">
        <li className={`step ${shipping ? "step-success" : ""}`}>Shipping</li>
        <li className={`step ${confirmOrder ? "step-success" : ""}`}>
          Confirm Order
        </li>
        <li className={`step ${methodState === "Card" ? "step-success" : ""}`}>
          Payment
        </li>
        <li
          className={`step ${methodState === "cod" || orderPlaced ? "step-success" : ""}`}
        >
          Order Placed
        </li>
      </ul>
    </div>
  );
};

export default CheckoutSteps;
