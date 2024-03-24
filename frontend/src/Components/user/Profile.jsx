import React from "react";
import UserLayout from "../Layouts/UserLayout";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const { shippingInfo } = useSelector((state) => state.cart);
  return (
    <UserLayout>
      <div className=" w-ful">
        {/* https://gist.github.com/goodreds/5b8a4a2bf11ff67557d38c5e727ea86c */}
        <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 mb-14 bg-white shadow-xl rounded-lg text-gray-900">
          <div className="rounded-t-lg h-32 overflow-hidden bg-gradient-to-tr from-red-900 via-red-700 to-red-500">
            {/* <img
              className="object-cover object-top w-full"
              src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
              alt="Mountain"
            /> */}
          </div>
          <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
            <img
              className="object-cover object-center h-32"
              src={
                user?.avatar
                  ? user?.avatar?.url
                  : "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
              }
              alt="avatar"
            />
          </div>
          <h1 className="pt-2 text-gray-700 text-center text-xl font-medium">
            Hello {user?.name || "User"}
          </h1>
          <div className="text-center mt-2">
            {/* <p className="text-gray-500">Freelance Web Designer</p> */}
          </div>
          <ul className="py-4 mt-2 text-gray-700 flex flex-col items-start justify-around text-start mx-16 gap-3">
            <li className="flex flex-row items-center justify-around gap-2">
              <i className="fa-solid fa-envelope"></i>
              <div>{user?.email}</div>
            </li>
            <li className="flex flex-row items-center justify-around gap-2">
              <i className="fa-solid fa-phone"></i>
              <div>{user?.phone}</div>
            </li>
            <li className="flex flex-row items-center justify-around gap-2">
              <i className="fa-solid fa-calendar-days"></i>
              <div>{user?.createdAt?.substring(0, 10)}</div>
            </li>
            <li className="flex flex-row items-center justify-around gap-2">
              <i className="fa-solid fa-location-dot"></i>
              <div>{shippingInfo?.address}</div>
            </li>
          </ul>
          <div className="p-4 border-t mx-8 mt-2 flex justify-around gap-5">
            {/* <button className="btn btn-primary w-1/2 mx-3">Orders</button> */}
            {/* <button className="btn btn-accent w-1/2 mx-3">Wishlist</button> */}
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default Profile;
