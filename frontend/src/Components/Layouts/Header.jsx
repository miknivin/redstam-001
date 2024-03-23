import React, { useState } from "react";
import Search from "./Search";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import { useGetMeQuery } from "../../redux/api/userApi";
import { useLazyLogoutQuery } from "../../redux/api/authApi";
import { useGetMeQuery } from "../../redux/api/userApi";
// import toast from "react-hot-toast";
function Header() {
  const navigate = useNavigate();
  const { isLoading } = useGetMeQuery();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [logout] = useLazyLogoutQuery();

  const [showDropDown, setShowDropDown] = useState(false);

  const logoutHandler = () => {
    logout();
    navigate(0);
  };
  const subtotal = cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);
  return (
    <div className="sticky top-0 z-50">
      <div className="py-4 pl-8 pr-10 bg-black navbar dark:bg-gray-950">
        <div className="flex-none">
          <Link to="/" className="p-0 text-xl text-gray-100">
            <img
              width={120}
              src="https://ik.imagekit.io/c1jhxlxiy/REDSTAM.webp?updatedAt=1710827797429"
              alt=""
            />
          </Link>
        </div>
        <div className="justify-end flex-1 gap-3">
          <Search />
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="p-1 text-sm text-white align-middle bg-red-700 rounded-full badge indicator-item">
                  {cartItems.length}
                </span>
              </div>
            </div>
            {/* cart */}
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body bg-base-300">
                <span className="text-lg font-bold">
                  {cartItems.length} Item(s)
                </span>
                <span className="text-info">Subtotal: ₹{subtotal}</span>
                <div className="card-actions">
                  <Link to="/cart" className="btn btn-accent btn-block">
                    View cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            {/* <Link to={user ? "/user" : "/login"}> */}
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div
                onClick={() => setShowDropDown(true)}
                className="w-8 rounded-full"
              >
                <img
                  alt="user"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            {/* </Link> */}
            {showDropDown && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-300 rounded-box w-52"
              >
                <li>
                  <Link
                    to={user ? "/me/profile" : "/login"}
                    className="justify-between"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/" onClick={logoutHandler}>
                    Logout
                  </Link>
                </li>
              </ul>
            )}
          </div>

          {/* <div className="w-10 rounded">
            <button className="font-bold btn btn-success">Login</button>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Header;
