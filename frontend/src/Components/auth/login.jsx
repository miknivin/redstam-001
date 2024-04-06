import React, { useEffect, useState } from "react";
import {
  useLoginMutation,
  useGoogleSignInMutation,
} from "../../redux/api/authApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Metadata from "../Layouts/Metadata";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase.config";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [
    googleSignIn,
    { isLoading: googleSignLoading, error: googleSignError },
  ] = useGoogleSignInMutation();
  const [login, { isLoading, error }] = useLoginMutation();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const SignUpUsingGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;

        // Generate a random password
        const generatedPassword = generateRandomPassword();

        let userData = { email: user.email, password: generatedPassword };

        // Check if the user has a phone number associated with the account
        if (user.phoneNumber) {
          // If phone number is available, use it for login
          userData = { phone: user.phoneNumber };
        }

        // Call login function with the appropriate user data
        const loginRes = await googleSignIn(userData);

        if (loginRes && loginRes.data && loginRes.data.token) {
          toast.success("User logged in successfully");
          navigate(-1);
        } else {
          toast.error("Login failed");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error Authenticating");
      });
  };

  // Function to generate a random password
  const generateRandomPassword = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";
    for (let i = 0; i < 8; i++) {
      password += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return password;
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
      toast.success("Login Success");
    }

    if (googleSignError) {
      toast.error(error?.data?.message);
    }

    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error, googleSignError, isAuthenticated, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };

    login(loginData);
  };
  return (
    <div className="bg-base-200 dark:bg-gray-900">
      <Metadata title={"Login"} />
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
              <div className="mt-12 flex flex-wrap sm:grid gap-6 grid-cols-2">
                <button className="w-full h-11 rounded-full border border-gray-300/75 bg-white px-6 transition active:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-800 dark:hover:border-gray-700">
                  <button
                    onClick={SignUpUsingGoogle}
                    className="w-max mx-auto flex items-center justify-center space-x-4"
                  >
                    {googleSignLoading ? (
                      <span className="loading loading-spinner loading-md"></span>
                    ) : (
                      <>
                        <img
                          src="https://www.svgrepo.com/show/475656/google-color.svg"
                          loading="lazy"
                          alt="google logo"
                          className="w-5"
                        />
                        <span className="block w-max text-sm font-semibold tracking-wide text-cyan-700 dark:text-white">
                          Sign in With Google
                        </span>
                      </>
                    )}
                  </button>
                </button>
              </div>
              <form
                onSubmit={submitHandler}
                className="mt-10 space-y-8 dark:text-white"
              >
                <div>
                  <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-emerald-500 dark:before:bg-emerald-600 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                    <input
                      id="email"
                      type="email"
                      placeholder="Your email or user name"
                      className="w-full bg-transparent pb-3  border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
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
                  <Link
                    to="/password/forgot"
                    type="reset"
                    className="-mr-3 w-max p-3"
                  >
                    <span className="text-sm tracking-wide text-sky-600 dark:text-sky-400">
                      Forgot password ?
                    </span>
                  </Link>
                </div>
                <div>
                  <button
                    className="w-full rounded-full bg-emerald-500 dark:bg-emerald-400 h-11 flex items-center justify-center px-6 py-3 transition hover:bg-emerald-600 focus:bg-emerald-600 active:bg-sky-800"
                    disabled={isLoading}
                  >
                    <span className="text-base font-semibold text-white dark:text-gray-900">
                      {isLoading ? "Authenticating" : "Login"}
                    </span>
                  </button>
                  <Link to="/register" type="reset" className="-ml-3 w-max p-3">
                    <span className="text-sm tracking-wide text-sky-600 dark:text-sky-400">
                      Create new account
                    </span>
                  </Link>
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
  );
};

export default Login;
