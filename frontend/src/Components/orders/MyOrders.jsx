import React, { useEffect, useState } from "react";
import { useMyOrdersQuery } from "../../redux/api/orderApi";
import Loader from "../Layouts/Loader";
import { toast } from "react-hot-toast";
import { MDBDataTable } from "mdbreact";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import MetaData from "../Layouts/Metadata";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/features/cartSlice";

import "./my-order.css";

const MyOrders = () => {
  const { data, isLoading, error, refetch } = useMyOrdersQuery();
  const [refreshKey, setRefreshKey] = useState(0); // State variable to trigger refresh
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderSuccess = searchParams.get("order_success");

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (orderSuccess) {
      dispatch(clearCart());
      // navigate("/me/orders");
      refetch();
    }

    // Increment refresh key to trigger re-render
    setRefreshKey((prevKey) => prevKey + 1);
  }, [dispatch, error, navigate, orderSuccess, refetch]);

  if (isLoading) return <Loader />;

  const setOrders = () => {
    const orders = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Payment Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Order Status",
          field: "orderStatus",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    data?.orders?.forEach((order) => {
      const lastSixDigits = order?._id.substring(order._id.length - 6); // Extract last 6 digits
      orders.rows.push({
        id: lastSixDigits,
        amount: `₹${order?.totalAmount}`,
        status: order?.paymentInfo?.status?.toUpperCase(),
        orderStatus: order?.orderStatus,
        actions: (
          <>
            <div className="flex-col sm:flex-row justify-center items-center">
              <Link to={`/me/order/${order?._id}`} className="me-3">
                <i className="fa fa-eye"></i>
              </Link>
              <Link to={`/invoice/order/${order?._id}`} className="">
                <i className="fa fa-print"></i>
              </Link>
            </div>
          </>
        ),
      });
    });

    return orders;
  };

  return (
    <>
      <MetaData title={"My Orders"} />

      <div className="max-w-screen-lg mx-auto min-h-[60vh]">
        <h1 className="my-5 text-3xl text-gray-300">
          {data?.orders?.length} Order(s)
        </h1>

        <MDBDataTable
          data={setOrders()}
          key={refreshKey} // Key to force re-render
          className="px-3 overflow-x-scroll lg:overflow-x-auto"
          bordered
          responsive
          rounded
          striped
          hover
        />
      </div>
    </>
  );
};

export default MyOrders;
