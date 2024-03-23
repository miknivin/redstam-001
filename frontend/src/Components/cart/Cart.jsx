import React, { useEffect } from "react";
import Metadata from "../Layouts/Metadata";
import { useDispatch, useSelector } from "react-redux";
import { setCartItem, removeCartItem } from "../../redux/features/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const taxes = subtotal * 0.1; // Assuming taxes are 10% of the subtotal
  const shipping = 0; // Assuming shipping is free
  const total = subtotal + taxes + shipping;
  const increseQty = (item, quantity) => {
    const newQty = quantity + 1;

    if (newQty > item?.stock) return;

    setItemToCart(item, newQty);
  };

  const decreseQty = (item, quantity) => {
    const newQty = quantity - 1;

    if (newQty <= 0) return;

    setItemToCart(item, newQty);
  };

  const setItemToCart = (item, newQty) => {
    const cartItem = {
      product: item?.product,
      name: item?.name,
      price: item?.price,
      image: item?.image,
      stock: item?.stock,
      quantity: newQty,
    };

    dispatch(setCartItem(cartItem));
  };

  const removeCartItemHandler = (id) => {
    dispatch(removeCartItem(id));
  };

  const checkoutHandler = () => {
    navigate("/shipping");
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when the component mounts
  }, []);

  return (
    <>
      <Metadata title={"Your Cart"} />
      {cartItems.length === 0 ? (
        <div className="w-full h-96 flex justify-center items-center text-8xl">
          Your Cart is Empty
        </div>
      ) : (
        <div>
          <div className="bg-gray-900 lg:h-screen py-8">
            <div className="container max-w-screen-xl mx-auto px-4">
              <h1 className="text-2xl font-semibold mb-4">
                Your Cart: {cartItems.length}
              </h1>
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="lg:w-3/4">
                  <div className=" bg-gray-200 rounded-lg shadow-md p-6 mb-4 overflow-x-scroll md:overflow-x-auto">
                    <table className="w-full table rounded-md">
                      <thead className="text-gray-800">
                        <tr>
                          <th className="text-left font-semibold">Product</th>
                          <th className="text-left font-semibold">Price</th>
                          <th className="text-left font-semibold">Quantity</th>
                          <th className="text-left font-semibold">Total</th>
                          <th className="text-left font-semibold">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((item) => (
                          <tr
                            key={item?.product}
                            className="hover rounded-md text-gray-600 hover:text-gray-400"
                          >
                            <td className="py-4">
                              <div className="flex flex-col md:flex-row items-start gap-2">
                                <img
                                  className="h-16 w-16 mr-4 rounded-lg"
                                  src={item?.image}
                                  alt={item?.name}
                                />
                                <span className="font-semibold">
                                  {item?.name}
                                </span>
                              </div>
                            </td>
                            <td className="py-4">${item?.price}</td>
                            <td className="py-4">
                              <div className="flex items-center flex-col justify-center">
                                <button
                                  className="border rounded-md py-1 px-2 text-xl h-fit"
                                  onClick={() =>
                                    decreseQty(item, item.quantity)
                                  }
                                >
                                  -
                                </button>
                                <input
                                  type="text"
                                  value={item.quantity}
                                  className="text-center bg-transparent w-8"
                                />

                                <button
                                  className="border rounded-md py-1 px-2 text-xl"
                                  onClick={() =>
                                    increseQty(item, item.quantity)
                                  }
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td className="py-4">
                              $
                              {Math.round(item.price * item.quantity * 100) /
                                100}
                            </td>
                            <td className="py-4">
                              <i
                                onClick={() =>
                                  removeCartItemHandler(item?.product)
                                }
                                className="fa-solid fa-trash text-red-500"
                              ></i>
                            </td>
                          </tr>
                        ))}
                        {/* More product rows */}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="lg:w-1/4">
                  <div className="bg-gray-300 text-gray-950 rounded-lg shadow-md p-6">
                    <h2 className="text-lg font-semibold mb-4">Summary</h2>
                    <div className="flex justify-between mb-2">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Taxes</span>
                      <span>${taxes.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">Total</span>
                      <span className="font-semibold">${total.toFixed(2)}</span>
                    </div>
                    <button
                      onClick={checkoutHandler}
                      className="bg-red-700 text-white py-2 px-4 rounded-lg mt-4 w-full"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
