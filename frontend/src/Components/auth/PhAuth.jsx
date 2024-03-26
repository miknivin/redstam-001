import React, { useState } from "react";
import OTPInput, { ResendOTP } from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../../firebase.config";
import "./phlogin.css";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { useLoginMutation } from "../../redux/api/authApi";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { calculateAge } from "../../helpers/helper";

const PhAuth = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  async function onSignup() {
    const userAge = calculateAge(selectedDate);
    if (userAge < 18) {
      toast.error("You must be at least 18 years old to sign up.");
      return;
    }
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
      } else if (
        error.code === "auth/argument-error" ||
        error.code === "auth/invalid-phone-number"
      ) {
        toast.error(
          "Invalid Phone no or Phone no is Empty. Please check your input.",
        );
      } else {
        toast.error(error.message);
        console.error(error);
      }
    }
  }

  const SignUpUsingGoogle = () => {
    const provider = new GoogleAuthProvider();
    const userAge = calculateAge(selectedDate);
    if (userAge < 18) {
      toast.error("You must be at least 18 years old to sign up.");
      return;
    }
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        let userData = { email: user.email };
        // Check if the user has a phone number associated with the account
        if (user.phoneNumber) {
          // If phone number is available, use it for login
          userData = { phone: user.phoneNumber };
        }

        // Call login function with the appropriate user data
        const loginRes = await login(userData);

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

  async function onOTPVerify() {
    try {
      setLoading(true);
      const res = await window.confirmationResult.confirm(otp);
      setLoading(false);

      // Call login function
      const loginRes = await login({ phone: res.user.phoneNumber });

      // Handle login response
      if (loginRes && loginRes.data && loginRes.data.token) {
        toast.success("User logged in successfully");
        navigate(-1);
      } else {
        // Handle login failure
        toast.error("Login failed");
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
                <div className="p-2 mx-auto bg-white rounded-full text-emerald-500 w-fit">
                  <i className="text-xl fa-solid fa-phone"></i>
                </div>
                <label
                  htmlFor=""
                  className="text-xl font-bold text-center text-white"
                >
                  Verify your phone number
                </label>
                <PhoneInput country={"in"} value={ph} onChange={setPh} />
                <div className="mt-1 mb-0">Date of birth</div>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  maxDate={new Date()}
                  showYearDropdown
                  scrollableMonthYearDropdown
                  scrollableYearDropdown
                />
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
                {/* Google sign-in button */}
                {/* This part should be implemented */}
                <button
                  className="flex justify-center gap-2 transition duration-150 border rounded-lg jus px-4 py-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow"
                  onClick={SignUpUsingGoogle}
                >
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
        </div>
      </section>
    </div>
  );
};

export default PhAuth;
