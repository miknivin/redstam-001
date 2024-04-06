import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const UserLayout = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const menuItems = [
    {
      name: "Profile",
      url: "/me/profile",
      icon: "fas fa-user",
    },
    {
      name: "Update Profile",
      url: "/me/update_profile",
      icon: "fas fa-user",
    },
    {
      name: "Orders",
      url: "/me/orders",
      icon: "fa-solid fa-box",
    },
  ];

  const location = useLocation();
  const [activeMenuItem, setActiveMenuItem] = useState(location.pathname);

  const handleMenuItemClick = (menuItemUrl) => {
    setActiveMenuItem(menuItemUrl);
  };

  return (
    <div className="bg-base-100 dark:bg-gray-900">
      <div className="max-w-screen-lg mx-auto">
        <div className="mt-2 mb-4">
          <h1 className="text-center text-5xl">User Setting</h1>
        </div>
        <div className="mx-auto my-5 w-fit">
          <div
            role="tablist"
            className="tabs tabs-boxed flex justify-center gap-5 bg-base-100 dark:bg-gray-900"
          >
            {menuItems.map((menuItem, index) => (
              <Link
                key={index}
                to={menuItem.url}
                role="tab"
                className={`tab ${activeMenuItem.includes(menuItem.url) ? "bg-pink-800 border-none text-gray-100" : ""}  w-fit h-fit px-4 py-2 border  border-gray-500`}
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
    </div>
  );
};

export default UserLayout;
