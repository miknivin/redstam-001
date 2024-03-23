import React, { useEffect, useState } from "react";
import OTPInput, { ResendOTP } from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { useLoginMutation, useRegisterMutation } from "../../redux/api/authApi";
import { useNavigate } from "react-router-dom";
import { useGetMeQuery } from "../../redux/api/userApi";
const PhAuth = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [phUser, setPhUser] = useState(null);
  const [ourUser, setOurUser] = useState({
    phone: "",
    password: generateRandomPassword(8),
  });

  function generateRandomPassword(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return password;
  }

  const navigate = useNavigate();

  const [register] = useRegisterMutation();
  const [login, { error, data }] = useLoginMutation();
  // const { isLoading } = useGetMeQuery();
  async function onSignup() {
    try {
      setLoading(true);
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});

      const formatPh = "+" + ph;

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        formatPh,
        recaptcha,
      );
      window.confirmationResult = confirmationResult;
      setLoading(false);
      setShowOTP(true);
      toast.success("OTP sent successfully!");
    } catch (error) {
      console.error(error);
      setLoading(false);
      if (error.code === "auth/too-many-requests") {
        toast.error("Too many requests. Please try again later.");
      } else {
        toast.error(error.message);
        console.error(error);
      }
    }
  }

  async function onOTPVerify() {
    try {
      setLoading(true);
      const res = await window.confirmationResult.confirm(otp);
      ourUser.phone = res.user.phoneNumber;
      setPhUser(res.user);

      setLoading(false);

      // Register the user
      const registerRes = await register(ourUser);
      toast.success("User registered successfully");

      // Check if registration was successful before attempting login
      if (registerRes) {
        // Call login function with the same parameters used for registration
        const loginRes = await login(ourUser);
        // Handle login response
        if (loginRes) {
          toast.success("User logged in successfully");
          console.log("loginres", "-", data);
          navigate(-1);
        } else {
          // Handle login failure
          toast.error("Login failed");
        }
      } else {
        // Handle registration failure
        toast.error("User registration failed");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      if (error.code === "auth/too-many-requests") {
        toast.error("Too many requests. Please try again later.");
      } else {
        toast.error(error.message);
      }
    }
  }

  return (
    <div>
      <section className="flex items-center justify-center p-24 bg-gray-800 md:p-48">
        <div>
          <Toaster toastOptions={{ duration: 4000 }} />

          {phUser ? (
            <h2 className="text-2xl font-medium text-center text-white">
              👍 Login Success
            </h2>
          ) : (
            <div className="flex flex-col gap-4 p-4 rounded-lg w-80">
              {showOTP ? (
                <>
                  <div className="p-4 mx-auto bg-white rounded-full text-emerald-500 w-fit">
                    <i className="text-2xl fa-solid fa-shield"></i>
                  </div>
                  <label
                    htmlFor="otp"
                    className="text-xl font-bold text-center text-white"
                  >
                    Enter your OTP
                  </label>
                  <OTPInput
                    value={otp}
                    onChange={setOtp}
                    OTPLength={6}
                    otpType="number"
                    disabled={false}
                    autoFocus
                    className="opt-container"
                  ></OTPInput>
                  <ResendOTP />
                  <button
                    onClick={onOTPVerify}
                    className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                  >
                    {loading && (
                      <span className="loading loading-spinner loading-md"></span>
                    )}
                    <span>Verify OTP</span>
                  </button>
                </>
              ) : (
                <>
                  <div className="p-4 mx-auto bg-white rounded-full text-emerald-500 w-fit">
                    <i className="text-2xl fa-solid fa-phone"></i>
                  </div>
                  <label
                    htmlFor=""
                    className="text-xl font-bold text-center text-white"
                  >
                    Verify your phone number
                  </label>
                  <PhoneInput country={"in"} value={ph} onChange={setPh} />
                  <div className="mt-5" id="recaptcha"></div>
                  <button
                    onClick={onSignup}
                    className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                  >
                    {loading && (
                      <span className="loading loading-spinner loading-md"></span>
                    )}
                    <span>Send code via SMS</span>
                  </button>
                  <button className="flex justify-center  gap-2 transition duration-150 border rounded-lg jus px-4 py-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow">
                    <img
                      className="w-6 h-6"
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      loading="lazy"
                      alt="google logo"
                    />
                    <span>Login with Google</span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default PhAuth;
