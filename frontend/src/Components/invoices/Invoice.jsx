import React, { useEffect } from "react";
import Metadata from "../Layouts/Metadata";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import Loader from "../Layouts/Loader";
import { useOrderDetailsQuery } from "../../redux/api/orderApi";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
const Invoice = () => {
  const params = useParams();
  const { data, isLoading, error } = useOrderDetailsQuery(params?.id);
  const order = data?.order || {};

  const { shippingInfo, orderItems, paymentInfo, user } = order;

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error]);

  const handleDownload = () => {
    const input = document.getElementById("order_invoice");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF();

      const pdfWidth = pdf.internal.pageSize.getWidth();
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, 0);
      pdf.save(`invoice_₹{order?._id}.pdf`);
    });
  };

  if (isLoading) return <Loader />;

  return (
    <div>
      <Metadata title={"Order Invoice"} />
      <div className=" w-full flex justify-center items-center">
        <button onClick={handleDownload} className="btn btn-success my-3">
          Download
        </button>
      </div>
      <div
        id="order_invoice"
        className="bg-white border rounded-lg shadow-lg px-6 py-8 max-w-md mx-auto mt-8"
      >
        <div className=" flex flex-col justify-center items-center">
          <img
            src="https://ik.imagekit.io/c1jhxlxiy/REDSTAM.webp?updatedAt=1710827797429"
            alt="logo"
            width={100}
          />
          <div className="flex flex-col justify-center items-center">
            <p className=" px-8  text-center text-sm">
              37/3489 - Fifth Floor, Manjooran Estate, Edappally, Kochi, Kerala,
              682024
            </p>
            <a
              href="mailto:info@redstam.com"
              className=" text-gray-600 underline text-center"
            >
              info@redstam.com
            </a>
          </div>
        </div>
        <hr className="mb-2" />
        <div className="flex justify-between mb-6">
          <h1 className="text-lg font-bold">Invoice</h1>
          <div className="text-gray-700 flex-wrap w-40">
            <div>
              <span className=" font-semibold">Date:</span>{" "}
              {new Date(order?.createdAt).toLocaleString("en-US")}
            </div>
            <div>
              <span className=" font-semibold">Invoice #</span>
              {order?._id && order._id.substring(order._id.length - 6)}
            </div>
            <div>
              <span className=" font-semibold">Status</span>{" "}
              {paymentInfo?.status}
            </div>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">Bill To:</h2>
          <div className="text-gray-700 mb-2">{shippingInfo?.fullName}</div>
          <div className="text-gray-700 mb-2">{shippingInfo?.address}</div>
          <div className="text-gray-700 mb-2">
            {shippingInfo?.city}, {shippingInfo?.zipCode}
          </div>
          <div className="text-gray-700">{shippingInfo?.phoneNo}</div>
        </div>
        <table className="w-full mb-8">
          <thead>
            <tr>
              <th className="text-left font-bold text-gray-700 text-sm">ID</th>
              <th className="text-left font-bold text-gray-700 text-sm">
                NAME
              </th>
              <th className="text-left font-bold text-gray-700 text-sm">
                PRICE
              </th>
              <th className="text-left font-bold text-gray-700 text-sm">QTY</th>
              <th className="text-left font-bold text-gray-700 text-sm">
                TOTAL
              </th>
            </tr>
          </thead>

          <tbody>
            {orderItems?.map((item) => (
              <tr>
                <td className="text-left text-gray-700 text-sm">
                  {item?.product &&
                    item.product.substring(item.product.length - 6)}
                </td>
                <td className="text-left text-gray-700 text-sm ">
                  {item?.name}
                </td>
                <td className="text-left text-gray-700 text-sm">
                  ₹{item?.price}
                </td>
                <td className="text-left text-gray-700 text-sm">
                  {item?.quantity}
                </td>
                <td className="text-left text-gray-700 text-sm">
                  ₹{item?.price * item?.quantity}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="w-full table-auto">
            <tr>
              <td className="text-left font-bold text-gray-700 text-sm">
                Sub-total
              </td>
              <td colSpan={4} className="text-right font-bold text-gray-700">
                ₹{order?.itemsPrice}
              </td>
            </tr>

            <tr>
              <td className="text-left font-bold text-gray-700 text-sm">
                TAX 18%
              </td>
              <td colSpan={4} className="text-right font-bold text-gray-700">
                ₹{order?.taxAmount}
              </td>
            </tr>
            <tr>
              <td className="text-left font-bold text-gray-700 text-sm">
                Shipping
              </td>
              <td colSpan={4} className="text-right font-bold text-gray-700">
                ₹{order?.shippingAmount}
              </td>
            </tr>
            <tr>
              <td className="text-left font-bold text-gray-700 text-sm">
                GRAND TOTAL
              </td>
              <td colSpan={4} className="text-right font-bold text-gray-700">
                ₹{order?.totalAmount}
              </td>
            </tr>
          </tfoot>
        </table>
        <div className="text-gray-700 mb-2">Thank you for your business!</div>
        <div className="text-gray-700 text-sm"></div>
      </div>
    </div>
  );
};

export default Invoice;
