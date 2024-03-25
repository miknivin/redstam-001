import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  useCreateNewOrderMutation,
  useStripeCheckoutSessionMutation,
} from "../../redux/api/orderApi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { caluclateOrderCost } from "../../helpers/helper";
import { clearCart } from "../../redux/features/cartSlice";

const PaymentMethods = ({ onMethodSelection }) => {
  const [method, setMethod] = useState("");

  const navigate = useNavigate();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);

  const [createNewOrder, { error, isSuccess }] = useCreateNewOrderMutation();

  const dispatch = useDispatch();

  const [
    stripeCheckoutSession,
    { data: checkoutData, error: checkoutError, isLoading },
  ] = useStripeCheckoutSessionMutation();

  useEffect(() => {
    if (checkoutData) {
      window.location.href = checkoutData?.url;
    }

    if (checkoutError) {
      toast.error(checkoutError?.data?.message);
    }
  }, [checkoutData, checkoutError]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data);
      console.error("error", " ", error);
    }

    if (isSuccess) {
      toast.success("COD Order placed");
      dispatch(clearCart());
      navigate("/order_placed?order_success=true");
    }
  }, [error, isSuccess, navigate, dispatch]);

  const handleMethod = (selectedMethod) => {
    onMethodSelection(selectedMethod);
    setMethod(selectedMethod);

    const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
      caluclateOrderCost(cartItems);

    if (selectedMethod === "cod") {
      // Create COD Order
      const orderData = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice,
        shippingAmount: totalPrice,
        taxAmount: taxPrice,
        totalAmount: totalPrice,
        paymentInfo: {
          status: "Not Paid",
        },
        paymentMethod: "COD",
      };
      createNewOrder(orderData);
    }

    if (selectedMethod === "Card") {
      // Stripe Checkout
      const orderData = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice,
        shippingAmount: shippingPrice,
        taxAmount: taxPrice,
        totalAmount: totalPrice,
      };

      stripeCheckoutSession(orderData);
    }
  };

  return (
    <>
      <div className="row wrapper">
        <div className=" flex flex-col gap-3">
          <button
            type="button"
            className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200 me-2 mb-2"
            onClick={() => handleMethod("Card")}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <>
                Pay with{" "}
                <span className=" inline-flex gap-2 ms-2 align-middle items-center justify-center">
                  <i className="fa-brands fa-google-pay text-xl"></i>{" "}
                  <i className="fa-brands fa-cc-visa text-xl"></i>{" "}
                  <i className="fa-brands fa-cc-mastercard text-xl"></i>
                  <i className="fa-brands fa-apple-pay text-xl"></i>
                </span>
              </>
            )}
          </button>

          <button
            type="button"
            className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200 me-2 mb-2"
            onClick={() => handleMethod("cod")}
          >
            Pay on Delivey{" "}
            <span className="ms-2">
              <i className="fa-solid fa-truck"></i>
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentMethods;
