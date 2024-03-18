import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const UserLayout = ({ children }) => {
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
      name: "Upload Avatar",
      url: "/me/upload_avatar",
      icon: "fas fa-user-circle",
    },
    {
      name: "Update Password",
      url: "/me/update_password",
      icon: "fas fa-lock",
    },
  ];

  const location = useLocation();
  const [activeMenuItem, setActiveMenuItem] = useState(location.pathname);

  const handleMenuItemClick = (menuItemUrl) => {
    setActiveMenuItem(menuItemUrl);
  };

  return (
    <div>
      <div className="max-w-screen-lg mx-auto">
        <div className="mt-2 mb-4">
          <h1 className="text-center text-5xl">User Setting</h1>
        </div>
        <div className="mx-auto my-5 w-fit">
          <div
            role="tablist"
            className="tabs tabs-boxed flex justify-center gap-5"
          >
            {menuItems.map((menuItem, index) => (
              <button
                key={index}
                role="tab"
                className={`tab ${activeMenuItem.includes(menuItem.url) ? "tab-active border-none" : ""}  w-fit h-fit px-4 py-2 border border-gray-500`}
                onClick={() => handleMenuItemClick(menuItem.url)}
                aria-current={
                  activeMenuItem.includes(menuItem.url) ? "true" : "false"
                }
              >
                {menuItem.name}
                <span className=" inline-flex align-middle">
                  <i className={`${menuItem.icon} ps-2`}></i>
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default UserLayout;
