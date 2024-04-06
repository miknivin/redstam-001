import React, { useEffect, useState } from "react";
import { useResetPasswordMutation } from "../../redux/api/userApi";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const [resetPassword, { isLoading, error, isSuccess }] =
    useResetPasswordMutation();

  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("Password reset successfully");
      navigate("/login");
    }
  }, [error, isAuthenticated, isSuccess, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Password does not match. Try again!");
    }

    const data = { password, confirmPassword };

    resetPassword({ token: params?.token, body: data });
  };
  return (
    <>
      <div className="bg-base-200 dark:bg-gray-900">
        <div className="m-auto xl:container px-12 sm:px-0 mx-auto">
          <div className="mx-auto h-full sm:w-max">
            <div className="m-auto  py-12">
              {/* <div className="space-y-4">
              <a href="#me">
                <img
                  src="images/tailus.svg"
                  className="w-40 dark:hidden"
                  alt="tailus logo"
                />
                <img
                  src="images/logo.svg"
                  className="w-40 hidden dark:block"
                  alt="tailus logo"
                />
              </a>
            </div> */}
              <div className="mt-12 rounded-3xl border bg-gray-50 dark:border-gray-700 dark:bg-gray-800 -mx-6 sm:-mx-10 p-8 sm:p-10">
                <h3 className="text-2xl font-semibold text-gray-700 dark:text-white">
                  Login to your account
                </h3>
                <form
                  onSubmit={submitHandler}
                  className="mt-10 space-y-8 dark:text-white"
                >
                  <div className="flex flex-col items-end">
                    <div className="w-full flex  relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-emerald-500 dark:before:bg-emerald-600 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Your password"
                        className="w-full bg-transparent pb-3  border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <i
                          className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
                        ></i>
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end py-4">
                    <div className="w-full flex  relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-emerald-500 dark:before:bg-emerald-600 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                      <input
                        id="password"
                        type="password"
                        placeholder="Confirm password"
                        className="w-full bg-transparent pb-3  border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                        {isLoading ? (
                          <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                          "Reset"
                        )}
                      </span>
                    </button>
                  </div>
                </form>
              </div>
              <div className="border-t pt-12 text-gray-500 dark:border-gray-800">
                {/* <div className="space-x-4 text-center">
                <span>© Tailus</span>
                <a
                  href="#me"
                  className="text-sm hover:text-sky-900 dark:hover:text-gray-300"
                >
                  Contact
                </a>
                <a
                  href="#me"
                  className="text-sm hover:text-sky-900 dark:hover:text-gray-300"
                >
                  Privacy &amp; Terms
                </a>
              </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
