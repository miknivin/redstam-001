import React from "react";
import { useSelector } from "react-redux";

import { useGetMeQuery } from "../../redux/api/userApi";
import { useLazyLogoutQuery } from "../../redux/api/authApi";
import { useNavigate } from "react-router-dom";
import Loader from "../Layouts/Loader";

const User = () => {
  const { isLoading } = useGetMeQuery();
  const { user } = useSelector((state) => state.auth);
  const [logout] = useLazyLogoutQuery();
  const navigate = useNavigate();
  const logoutHandler = () => {
    logout();
    navigate(0);
  };
  if (isLoading) {
    return <Loader />;
  }

  if (!user) {
    navigate("/");
    return null; // Render nothing
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className=" w-full mx-auto flex justify-between py-3">
        <h1 className=" text-3xl">Your account</h1>
        <button onClick={logoutHandler} className="btn btn-outline btn-error">
          Sign Out
        </button>
      </div>
      <div className="flex justify-between">
        <div className="w-fit border border-slate-500 rounded-lg my-6">
          <div className="card card-side bg-base-100 shadow-xl">
            <figure>
              <img
                className=" w-56 h-56 object-cover"
                src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg&ga=GA1.1.247051650.1657018273&semt=ais"
                alt=""
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{user?.name}</h2>
              <p>{user?.email}</p>
              <div className="card-actions justify-start gap-6">
                <button className="btn btn-accent">My orders</button>
                <button className="btn btn-primary">My Wishlist</button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-fit border border-slate-500 rounded-lg my-6 h-fit">
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body justify-between">
              <h2 className="card-title">Address</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Update</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
