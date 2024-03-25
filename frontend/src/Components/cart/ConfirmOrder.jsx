import React, { useEffect, useState } from "react";
import Metadata from "../Layouts/Metadata";
import StarRatings from "react-star-ratings";
import { useDispatch, useSelector } from "react-redux";
import { caluclateOrderCost } from "../../helpers/helper";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckOutSteps";
import PaymentMethods from "./PaymentMethods";

const ConfirmOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const [methodState, setMethodState] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
    caluclateOrderCost(cartItems);
  const handleButtonClick = (newState) => {
    setMethodState(newState);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="">
      <Metadata title={"Confirm Order Info"}></Metadata>
      <div className="sticky top-20 z-10 w-full bg-gray-900 rounded-box mx-auto">
        <CheckoutSteps shipping confirmOrder methodState={methodState} />
      </div>
      <section className="py-24 relative bg-gray-900 dark:bg-gray-900 ">
        <div className="w-full max-w-screen-lg px-4 md:px-5 lg-6 mx-auto ">
          <div className="flex items-start flex-col gap-6 xl:flex-row justify-center">
            <div className="w-full max-w-sm md:max-w-3xl xl:max-w-sm flex items-start flex-col gap-8 max-xl:mx-auto bg-none">
              <div className="p-6 border border-gray-200 rounded-3xl w-full group transition-all duration-500 hover:border-gray-400 text-gray-200">
                <h2 className="font-bold text-3xl leading-10 pb-6 border-b border-gray-200 ">
                  Order Summary
                </h2>
                <div className="data py-6 border-b border-gray-200">
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <p className="font-normal text-lg leading-8 transition-all duration-500 group-hover">
                      Product Cost
                    </p>
                    <p className="font-medium text-lg leading-8">
                      ${itemsPrice}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <p className="font-normal text-lg leading-8 transition-all duration-500 group-hover">
                      Shipping
                    </p>
                    <p className="font-medium text-lg leading-8">
                      ${shippingPrice}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <p className="font-normal text-lg leading-8 transition-all duration-500 group-hover">
                      Tax Price
                    </p>
                    <p className="font-medium text-lg leading-8">${taxPrice}</p>
                  </div>
                </div>
                <div className="total flex items-center justify-between pt-6">
                  <p className="font-normal text-xl leading-8 ">Subtotal</p>
                  <h5 className="font-bold text-2xl leading-9 text-yellow-800 dark:text-yellow-500">
                    ${totalPrice}
                  </h5>
                </div>
                <div className=" w-full mt-4">
                  <PaymentMethods onMethodSelection={handleButtonClick} />
                </div>
              </div>
            </div>
            <div className="w-full max-w-sm md:max-w-3xl max-xl:mx-auto">
              <div className="grid grid-cols-1 gap-6">
                <div className=" max-h-52 overflow-y-auto flex flex-col gap-2">
                  {/* cart items */}
                  {cartItems?.map((item) => (
                    <div
                      id="toast-message-cta"
                      className="w-full max-w-xl p-4 text-gray-500 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-400"
                    >
                      <div className="flex">
                        <img
                          className=" w-20 h-20 rounded-box"
                          src={item?.image}
                          alt={item.name}
                        />
                        <div className="ms-3 text-sm font-normal h-full flex flex-col gap-2">
                          <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white flex justify-around gap-4">
                            {item?.name}
                            <span className=" text-yellow-600">
                              {" "}
                              {item?.quantity} x ${item?.price} ={" "}
                              <b>${(item?.quantity * item.price).toFixed(2)}</b>
                            </span>
                          </span>
                          <span>{item.quantity} no(s)</span>
                          {/* <div className="mb-2 text-sm font-normal">
                        Hi Neil, thanks for sharing your thoughts regarding
                        Flowbite.
                      </div> */}
                          <StarRatings
                            rating={4}
                            starRatedColor="#FFBE00"
                            numberOfStars={5}
                            name="rating"
                            starDimension="20px"
                            starSpacing="1px"
                          />
                        </div>
                        {/* <button
                          type="button"
                          className="ms-auto -mx-1.5 -my-1.5 bg-white justify-center items-center flex-shrink-0 text-gray-400 hover:text-red-600 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-red-500 dark:bg-gray-800 dark:hover:bg-gray-700"
                          data-dismiss-target="#toast-message-cta"
                          aria-label="Close"
                        >
                          <span className="sr-only">Close</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                          </svg>
                        </button> */}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="card w-96 bg-base-200 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title">Shipping details</h2>
                    <p className="text-sm">
                      {" "}
                      <b>Name:</b> {shippingInfo.fullName}
                    </p>
                    <p className="text-sm">
                      <b>Phone:</b> {shippingInfo?.phoneNo}
                    </p>
                    <p className="text-sm">
                      <b>Address:</b> {shippingInfo?.address},{" "}
                      {shippingInfo?.city}, {shippingInfo?.zipCode},{" "}
                      {shippingInfo?.country}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConfirmOrder;
