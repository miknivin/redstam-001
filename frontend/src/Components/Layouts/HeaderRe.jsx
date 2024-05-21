import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
// import { useGetMeQuery } from "../../redux/api/userApi";
import { useLazyLogoutQuery } from "../../redux/api/authApi";
import { useGetMeQuery } from "../../redux/api/userApi";
import toast from "react-hot-toast";
import CategoryFilter from "./CategoryFilter";

const HeaderRe = () => {
  const [isHidden, setIsHidden] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading } = useGetMeQuery();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const [isHovered, setIsHovered] = useState(false);

  const [logout, { isSuccess, error }] = useLazyLogoutQuery();

  const [showDropDown, setShowDropDown] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("");
  const logoutHandler = () => {
    logout();
    navigate(0);
  };

  const isActive = (pathname) => {
    if (location.pathname === pathname) {
      if (activeMenuItem === "testimonials") {
        console.log("condition");
        return "";
      } else {
        return "text-red-500";
      }
    } else {
      return "";
    }
  };

  const scrollToElement = (ref, menuItem) => {
    setActiveMenuItem(menuItem);
    const element = document.querySelector(`#${ref}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Logout successful");
      navigate("/");
    }

    if (error) {
      toast.error(error.message);
      navigate(0);
    }
  }, [isSuccess, navigate, error]);

  const subtotal = cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  const handleButtonClick = () => {
    setActiveMenuItem("");
    setIsHidden(true); // Set isHidden to true when button or link is clicked
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Entry is in view, update the activeMenuItem
            const cleanedId = entry.target.id.replace("Ref", "");
            const capitalizedId =
              cleanedId.charAt(0).toUpperCase() + cleanedId.slice(1);
            setActiveMenuItem(capitalizedId);
          }
        });
      },
      { threshold: 0.3 },
    ); // Adjust the threshold as needed

    // Observe each section
    const sections = document.querySelectorAll("[data-section]");
    sections.forEach((section) => {
      observer.observe(section);
    });

    // Clean up observer on component unmount
    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <nav className="bg-base-300 bb-white sticky dark:bg-gray-950 w-full z-50 top-0 start-0 border-b border-gray-200 dark:border-gray-600 py-1">
      <div className="max-w-screen-xl lg:max-w-full flex flex-wrap items-center justify-between mx-auto p-4 font-bcf font-bold">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://ik.imagekit.io/c1jhxlxiy/REDSTAM%20LOGO.png?updatedAt=1712393715806"
            className=" w-32"
            alt="redstam logo"
          />
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <div className="sm:flex hidden items-center justify-end gap-4 me-3">
            {/* Cart */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
                onMouseEnter={() => setIsHovered(true)}
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
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
                onMouseLeave={() => setIsHovered(false)}
                className={`mt-3 z-[1] card card-compact ${!isHovered ? "hidden" : "block"} dropdown-content w-52 bg-base-100 shadow`}
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
            {/* user */}
            <div className="dropdown dropdown-end">
              {/* <Link to={user ? "/me/profile" : "/login"}> */}
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div
                  onClick={() => setShowDropDown(!showDropDown)}
                  className=" w-8 rounded-full border"
                >
                  <i className="fa-regular fa-user p-2"></i>
                </div>
              </div>
              {/* </Link> */}
              {showDropDown && (
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-300 rounded-box w-52"
                  onMouseLeave={() => setShowDropDown(false)}
                >
                  <li>
                    {user?.role === "admin" && (
                      <Link className="dropdown-item" to="/admin/products">
                        {" "}
                        Dashboard{" "}
                      </Link>
                    )}
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
          </div>
          {/* cart */}
          <Link
            to="/cart"
            className="flex md:hidden items-center hover:text-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span class="flex absolute -mt-5 ml-4">
              <span class="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          </Link>
          {/* Hamburger */}
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
            onClick={() => setIsHidden(!isHidden)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        {/* nav items */}
        <div
          className={`items-center justify-between  ${isHidden ? "hidden" : ""} w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
        >
          <ul className="bb-white flex flex-col p-4 md:p-0 mt-4 border text-gray-800 dark:text-gray-300 border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:border-gray-700 font-bold">
            <li>
              <Link
                to="/"
                className={`block py-2 px-3 rounded md:bg-transparent md:hover:text-red-500 md:p-0 ${isActive("/")}`}
                aria-current="page"
                onClick={handleButtonClick} // Call handleButtonClick on click
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`block py-2 px-3 rounded md:bg-transparent md:hover:text-red-500 md:p-0 ${isActive("/about")}`}
                onClick={handleButtonClick} // Call handleButtonClick on click
              >
                About
              </Link>
            </li>

            <li>
              <Link
                to="/#testimonials" // Target location of the link
                className={`block py-2 px-3 rounded md:bg-transparent md:hover:text-red-500 md:p-0 ${activeMenuItem === "testimonials" ? "text-red-500" : ""}`}
                onClick={() =>
                  scrollToElement("testimonialsRef", "testimonials")
                } // Function to execute on click (scroll to testimonials section)
              >
                Testimonials
              </Link>
            </li>
            <li>
              <CategoryFilter/>
            </li>
            <li>
              <Link
                to="/contact"
                className={`block py-2 px-3 rounded md:bg-transparent md:hover:text-red-500 md:p-0 ${isActive("/contact")}`}
                onClick={handleButtonClick} // Call handleButtonClick on click
              >
                Contact
              </Link>
            </li>
            <li>
              <div className="md:hidden flex items-center px-3 gap-6 me-3">
                {/* user */}
                <Link
                  to={user ? "/me/profile" : "/login"}
                  className="hover:text-gray-600 border-2 w-fit h-fit rounded-full"
                  onClick={handleButtonClick} // Call handleButtonClick on click
                >
                  <i className="fa-regular fa-user p-2"></i>
                </Link>
                <Link
                  to="/cart"
                  className="hover:text-gray-600 border-2 w-fit h-fit rounded-full"
                  onClick={handleButtonClick} // Call handleButtonClick on click
                >
                  <i className="fa-solid fa-cart-shopping p-2"></i>
                </Link>
                <button
                  className="hover:text-gray-600 border-2 w-fit h-fit rounded-full"
                  onClick={logoutHandler} // Call handleButtonClick on click
                >
                  <i className="fa-solid fa-right-from-bracket text-red-600 p-2"></i>
                </button>
                {/* <a
                href="#me"
                target="blank"
                aria-label="medium"
                className="hover:text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  fill="currentColor"
                  className="bi bi-medium"
                  viewBox="0 0 16 16"
                >
                  <path d="M9.025 8c0 2.485-2.02 4.5-4.513 4.5A4.506 4.506 0 0 1 0 8c0-2.486 2.02-4.5 4.512-4.5A4.506 4.506 0 0 1 9.025 8zm4.95 0c0 2.34-1.01 4.236-2.256 4.236-1.246 0-2.256-1.897-2.256-4.236 0-2.34 1.01-4.236 2.256-4.236 1.246 0 2.256 1.897 2.256 4.236zM16 8c0 2.096-.355 3.795-.794 3.795-.438 0-.793-1.7-.793-3.795 0-2.096.355-3.795.794-3.795.438 0 .793 1.699.793 3.795z" />
                </svg>
              </a> */}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default HeaderRe;
