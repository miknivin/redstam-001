import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const menuItems = [
    {
      name: "All Products",
      url: "/admin/products",
      icon: "fas fa-boxes-stacked ",
    },
    {
      name: "Add Product",
      url: "/admin/add_products",
      icon: "fas fa-plus",
    },
    {
      name: "Orders",
      url: "/admin/orders",
      icon: "fa-solid fa-box",
    },
  ];

  const location = useLocation();
  const [activeMenuItem, setActiveMenuItem] = useState(location.pathname);

  const handleMenuItemClick = (menuItemUrl) => {
    setActiveMenuItem(menuItemUrl);
  };
  return (
    <>
      <div className="max-w-screen-lg mx-auto ">
        <div className="mt-2 mb-4">
          <h1 className="text-center text-gray-100 text-5xl">User Setting</h1>
        </div>
        <div className="mx-auto my-5 overflow-x-scroll md:overflow-x-auto">
          <div
            role="tablist"
            className="tabs tabs-boxed flex justify-center gap-5 bg-transparent"
          >
            {menuItems.map((menuItem, index) => (
              <Link
                key={index}
                to={menuItem.url}
                role="tab"
                className={`tab ${activeMenuItem.includes(menuItem.url) ? " bg-emerald-500 border-none" : ""}  w-fit h-fit px-4 py-2 border border-gray-500 text-xs md:text-sm flex flex-nowrap text-gray-100`}
                onClick={() => handleMenuItemClick(menuItem.url)}
                aria-current={
                  activeMenuItem.includes(menuItem.url) ? "true" : "false"
                }
              >
                {menuItem.name}
                <span className=" inline-flex align-middle">
                  <i className={`${menuItem.icon} ps-2`}></i>
                </span>
              </Link>
            ))}
          </div>
        </div>
        <div className="w-full">{children}</div>
      </div>
    </>
  );
};

export default AdminLayout;
