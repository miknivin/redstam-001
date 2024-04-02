import React, { useEffect, useState } from "react";
import { useRegisterMutation } from "../../redux/api/authApi";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = user;
  const { isAuthenticated } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const [register, { isLoading, error, data }] = useRegisterMutation();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    register(user)
      .then(() => {
        // Handle successful registration
        navigate("/");
      })
      .catch((error) => {
        // Handle registration failure
        toast.error(error?.data?.message);
      });
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error, isAuthenticated, navigate]);

  return (
    <div>
      <div className="m-auto xl:container px-12 sm:px-0 mx-auto">
        <div className="mx-auto h-full sm:w-max">
          <div className="m-auto  py-12">
            <div className="mt-12 rounded-3xl border bg-gray-50 dark:border-gray-700 dark:bg-gray-800 -mx-6 sm:-mx-10 p-8 sm:p-10">
              <h3 className="text-2xl font-semibold text-gray-700 dark:text-white">
                Register to your account
              </h3>
              <div className="mt-2 flex flex-wrap sm:grid gap-6 grid-cols-2"></div>
              <form
                className="mt-10 space-y-8 dark:text-white"
                onSubmit={handleSubmit}
              >
                <div>
                  <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-emerald-500 dark:before:bg-emerald-600 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                    <input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      className="w-full bg-transparent pb-3  border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition"
                      value={name}
                      name="name"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-emerald-500 dark:before:bg-emerald-600 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                    <input
                      id="email"
                      type="email"
                      placeholder="Your email"
                      className="w-full bg-transparent pb-3  border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition"
                      value={email}
                      name="email"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-emerald-500 dark:before:bg-emerald-600 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                    <input
                      id="password"
                      type="password"
                      placeholder="Your password"
                      className="w-full bg-transparent pb-3  border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition"
                      value={password}
                      name="password"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-emerald-500 dark:before:bg-emerald-600 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                    <input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm password"
                      className="w-full bg-transparent pb-3  border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition"
                      value={confirmPassword}
                      name="confirmPassword"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full rounded-full bg-emerald-500 dark:bg-emerald-400 h-11 flex items-center justify-center px-6 py-3 transition hover:bg-emerald-600 focus:bg-emerald-600 active:bg-sky-800"
                    disabled={isLoading}
                  >
                    <span className="text-base font-semibold text-white dark:text-gray-900">
                      {isLoading ? "Authenticating" : "Register"}
                    </span>
                  </button>
                  <Link to="/login" className="-ml-3 w-max p-3">
                    <span className="text-sm tracking-wide text-sky-600 dark:text-sky-400">
                      Already have an Account
                    </span>
                  </Link>
                </div>
              </form>
            </div>
            <div className="border-t pt-12 text-gray-500 dark:border-gray-800"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
