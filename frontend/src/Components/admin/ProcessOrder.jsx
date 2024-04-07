import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { Link, useParams } from "react-router-dom";
import {
  useOrderDetailsQuery,
  useUpdateOrderMutation,
} from "../../redux/api/orderApi";
import SkeletonHero from "../utilities/SkeletonHero";
import Metadata from "../Layouts/Metadata";
import AdminLayout from "../Layouts/AdminLayout";

const ProcessOrder = () => {
  const [status, setStatus] = useState("");

  const params = useParams();
  const { data, isLoading } = useOrderDetailsQuery(params?.id);
  const order = data?.order || {};

  const [updateOrder, { error, isSuccess }] = useUpdateOrderMutation();

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
    if (orderStatus) {
      setStatus(orderStatus);
    }
  }, [orderStatus]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("Order updated");
    }
  }, [error, isSuccess]);

  const updateOrderHandler = (id) => {
    const data = { status };
    updateOrder({ id, body: data });
  };

  return (
    <AdminLayout>
      <Metadata title={"Process Order"} />
      <div>
        <div>
            <Link to="/admin/orders" className="btn  rounded-full h-fit">
            <i class="fa-solid fa-arrow-left text-xl"></i>
            </Link>
        </div>
        {isLoading ? (
          <SkeletonHero />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
            <div className="order-details">
              <h3 className="mt-5 mb-4 text-3xl font-medium">Order Details</h3>

              <table className="table-auto w-full">
                <tbody>
                  <tr>
                    <th className="border px-4 py-2">ID</th>
                    <td className="border px-4 py-2">{order?._id}</td>
                  </tr>
                  <tr>
                    <th className="border px-4 py-2">Order Status</th>
                    <td
                      className={`border px-4 py-2 ${
                        String(orderStatus).includes("Delivered")
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      <b>{orderStatus}</b>
                    </td>
                  </tr>
                </tbody>
              </table>

              <h3 className="mt-5 mb-4 text-3xl font-medium">Shipping Info</h3>
              <table className="table-auto w-full">
                <tbody>
                  <tr>
                    <th className="border px-4 py-2">Name</th>
                    <td className="border px-4 py-2">{user?.name}</td>
                  </tr>
                  <tr>
                    <th className="border px-4 py-2">Phone No</th>
                    <td className="border px-4 py-2">
                      {shippingInfo?.phoneNo}
                    </td>
                  </tr>
                  <tr>
                    <th className="border px-4 py-2">Address</th>
                    <td className="border px-4 py-2">
                      {shippingInfo?.address}, {shippingInfo?.city},{" "}
                      {shippingInfo?.zipCode}, {shippingInfo?.country}
                    </td>
                  </tr>
                </tbody>
              </table>

              <h3 className="mt-5 mb-4 text-3xl font-medium">Payment Info</h3>
              <table className="table-auto w-full">
                <tbody>
                  <tr>
                    <th className="border px-4 py-2">Status</th>
                    <td
                      className={`border px-4 py-2 ${isPaid ? "text-green-600" : "text-red-600"}`}
                    >
                      <b>{paymentInfo?.status}</b>
                    </td>
                  </tr>
                  <tr>
                    <th className="border px-4 py-2">Method</th>
                    <td className="border px-4 py-2">{order?.paymentMethod}</td>
                  </tr>
                  <tr>
                    <th className="border px-4 py-2">Payment ID</th>
                    <td className="border px-4 py-2">
                      {paymentInfo?.id || "Nill"}
                    </td>
                  </tr>
                  <tr>
                    <th className="border px-4 py-2">Amount Paid</th>
                    <td className="border px-4 py-2">₹{totalAmount}</td>
                  </tr>
                </tbody>
              </table>

              <h3 className="mt-5 my-4 text-3xl font-medium">Order Items:</h3>

              <hr />
              <div className="cart-item my-1">
                {orderItems?.map((item) => (
                  <div
                    key={item._id}
                    className="grid grid-cols-1 md:grid-cols-4 my-5"
                  >
                    <div className="col-span-1">
                      <img
                        src={item?.image}
                        alt={item?.name}
                        height="45"
                        width="65"
                      />
                    </div>

                    <div className="col-span-2">
                      <Link to={`/products/${item?.product}`}>
                        {item?.name}
                      </Link>
                    </div>

                    <div className="col-span-1">
                      <p>₹{item?.price}</p>
                    </div>

                    <div className="col-span-1">
                      <p>{item?.quantity} Piece(s)</p>
                    </div>
                  </div>
                ))}
              </div>
              <hr />
            </div>

            <div className="mt-5">
              <h4 className="my-4 text-3xl font-medium">Status</h4>

              <div className="mb-3">
                <select
                  className="select select-bordered w-full text-xl"
                  name="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>

              <button
                className="btn bg-emerald-500 text-white w-full"
                onClick={() => updateOrderHandler(order?._id)}
              >
                Update Status
              </button>

              <h4 className="mt-5 mb-3 text-3xl font-medium">Order Invoice</h4>
              <Link
                to={`/invoice/order/${order?._id}`}
                className="btn bg-sky-600 text-gray-50 w-full"
              >
                <i className="fa fa-print"></i> Generate Invoice
              </Link>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ProcessOrder;
