import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../redux/api/userApi";
import Metadata from "../Layouts/Metadata";

const UpdateUser = ({ userId, closeModal }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const { data, isLoading } = useGetUserDetailsQuery(userId);
  const [updateUser, { error, isSuccess }] = useUpdateUserMutation();

  useEffect(() => {
    if (data?.user) {
      setName(data?.user?.name);
      setEmail(data?.user?.email);
      setRole(data?.user?.role);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
      closeModal();
    }

    if (isSuccess) {
      toast.success("User Updated");
      closeModal();
    }
  }, [closeModal, error, isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      role,
    };

    updateUser({ id: userId, body: userData });
  };

  useEffect(() => {
    console.log(userId);
  }, [userId]);

  return (
    <>
      <Metadata title={"Update User"} />
      <div className="w-full ">
        <div className="">
          {isLoading ? (
            <div className="flex justify-center items-center h-24">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <form className="shadow-lg" onSubmit={submitHandler}>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white my-2">
                Update Product
              </h3>

              <div className="mb-3">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type product name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type product name"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="role_field" className="form-label">
                  Role
                </label>
                <select
                  id="role_field"
                  className="select select-bordered w-full"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn bg-emerald-500 w-100 py-2 text-white my-5"
              >
                Update
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
