import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import Loader from "../Layouts/Loader";
import { toast } from "react-hot-toast";
import MetaData from "../Layouts/Metadata";
import { useOrderDetailsQuery } from "../../redux/api/orderApi";

const OrderDetails = () => {
  const params = useParams();
  const { data, isLoading, error } = useOrderDetailsQuery(params?.id);
  const order = data?.order || {};

  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    user,
    totalAmount,
    orderStatus,
  } = order;

  const isPaid = paymentInfo?.status === "paid" ? true : false;

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
      console.error(error);
    }
  }, [error]);

  if (isLoading) return <Loader />;

  return (
    <>
      <MetaData title={"Order Details"} />
      <div className="flex justify-center">
        <div className="w-full lg:w-9/12 mt-5">
          <div className="flex justify-between items-center">
            <h3 className="mt-5 mb-4 text-2xl">Your Order Details</h3>
            <a href="/invoice/order/order-id" className="btn btn-success">
              <i className="fa fa-print"></i> Invoice
            </a>
          </div>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <tbody>
              <tr>
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <td className="border border-gray-300 px-4 py-2">
                  {order?._id}
                </td>
              </tr>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <td
                  className={`${orderStatus.includes("Delivered") ? "text-green-500" : "text-red-500"} border border-gray-300 px-4 py-2`}
                >
                  <b>{orderStatus}</b>
                </td>
              </tr>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Date</th>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(order?.createdAt).toLocaleString("en-US")}
                </td>
              </tr>
            </tbody>
          </table>

          <h3 className="mt-5 mb-4 text-2xl">Shipping Info</h3>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <tbody>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <td className="border border-gray-300 px-4 py-2">
                  {user.name}
                </td>
              </tr>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Phone No</th>
                <td className="border border-gray-300 px-4 py-2">
                  {shippingInfo?.phoneNo}
                </td>
              </tr>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Address</th>
                <td className="border border-gray-300 px-4 py-2">
                  {shippingInfo?.address}, {shippingInfo?.city},{" "}
                  {shippingInfo?.zipCode}, {shippingInfo?.country}
                </td>
              </tr>
            </tbody>
          </table>

          <h3 className="mt-5 mb-4 text-2xl">Payment Info</h3>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <tbody>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <td
                  className={`${isPaid ? "text-green-500" : "text-red-500"} border border-gray-300 px-4 py-2`}
                >
                  <b>{paymentInfo?.status}</b>
                </td>
              </tr>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Method</th>
                <td className="border border-gray-300 px-4 py-2">
                  {order?.paymentMethod}
                </td>
              </tr>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Stripe ID</th>
                <td className="border border-gray-300 px-4 py-2">
                  {paymentInfo?.id || "Nill"}
                </td>
              </tr>
              <tr>
                <th className="border border-gray-300 px-4 py-2">
                  Amount Paid
                </th>
                <td className="border border-gray-300 px-4 py-2">
                  ₹{totalAmount}
                </td>
              </tr>
            </tbody>
          </table>

          <h3 className="mt-5 mb-4 text-2xl">Order Items:</h3>

          <hr className="my-4" />
          <div className="my-1 px-4 lg:px-0">
            {orderItems?.map((item, index) => (
              <div
                key={index}
                className="flex flex-wrap my-5 border-b-2 border-b-slate-400 pb-2"
              >
                <div className="w-full lg:w-1/6 ">
                  <img
                    src={item?.image}
                    alt={item?.name}
                    className="h-12 w-12  lg:h-20 lg:w-20 rounded-box"
                  />
                </div>

                <div className="w-full lg:w-2/6 mt-2 lg:mt-0">
                  <Link
                    to={`/products/${item?.product}`}
                    className="text-blue-100 hover:underline"
                  >
                    {item?.name}
                  </Link>
                </div>

                <div className="w-full lg:w-1/6 mt-2 lg:mt-0">
                  <p>₹{item?.price}</p>
                </div>

                <div className="w-full lg:w-2/6 mt-2 lg:mt-0">
                  <p>{item?.quantity} Piece(s)</p>
                </div>
              </div>
            ))}
          </div>
          <hr className="my-4" />
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
