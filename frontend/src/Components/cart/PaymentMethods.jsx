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
import { key } from "../utilities/key";

const PaymentMethods = ({ onMethodSelection }) => {
  const [method, setMethod] = useState("");

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [createNewOrder, { error, isSuccess }] = useCreateNewOrderMutation();

  const dispatch = useDispatch();

  const [
    stripeCheckoutSession,
    { data: checkoutData, error: checkoutError, isLoading },
  ] = useStripeCheckoutSessionMutation();

  useEffect(() => {
    if (checkoutData) {
      // const { totalPrice } = caluclateOrderCost(cartItems);
      // window.location.href = checkoutData?.url;
      console.log(checkoutData);
      checkoutHandler(checkoutData);
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
        // shippingInfo,
        orderItems: cartItems,
        // itemsPrice,
        // shippingAmount: shippingPrice,
        // taxAmount: taxPrice,
        currency: "INR",
        itemsPrice: totalPrice,
      };
      console.log("Order-items", "", orderData);
      console.log("items-price", "", itemsPrice);
      stripeCheckoutSession(orderData);
    }
  };

  const checkoutHandler = async (checkoutData) => {
    setPaymentLoading(true);
    const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
      caluclateOrderCost(cartItems);
    const options = {
      key: key,
      amount: checkoutData.amount,
      currency: "INR",
      name: "Lonicera Herbals",
      description: "Tutorial of RazorPay",
      image:
        "https://res.cloudinary.com/dgs5n1wt5/image/upload/v1711693978/lonicera/LONICERA_HERBALS_LOGO_231109_131255_page-0001_ppdpyg.jpg",
      order_id: checkoutData.id,
      // callback_url: "http://localhost:3000/api/v1/payment/webhook",
      handler: function (response) {
        // Extract response data
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
          response;

        // Create payload to send to backend
        const payload = {
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature,
          shippingInfo,
          cartItems,
          user,
          itemsPrice,
          shippingPrice,
          totalPrice,
          taxPrice,
        };

        console.log(payload, "response-razorpay");

        // Make POST request to backend endpoint
        fetch("http://localhost:4000/api/v1/payment/webhook", {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: JSON.stringify(payload),
        })
          .then((response) => {
            if (response.ok) {
              setPaymentLoading(false);
              toast.success("Paymant Successful");
              navigate("/order_placed?order_success=true");
              console.log("Response sent successfully");
            } else {
              toast.error("Payment Failed");
              console.error("Failed to send response to backend");
              setPaymentLoading(false);
            }
          })
          .catch((error) => {
            console.error("Error sending response to backend:", error);
          });
      },

      prefill: {
        name: shippingInfo.fullName,
        email: shippingInfo.email,
        contact: shippingInfo.phoneNo,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#38B261",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
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
            {isLoading || paymentLoading ? (
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
