import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { countries } from "countries-list";
import { saveShippingInfo } from "../../redux/features/cartSlice";
import Metadata from "../Layouts/Metadata";
import CheckoutSteps from "./CheckOutSteps";
import toast from "react-hot-toast";

const Shipping = () => {
  const countriesList = Object.values(countries);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [country, setCountry] = useState("India");
  const [selectedCountryCode, setSelectedCountryCode] = useState("91");
  const [isValidPhone, setIsValidPhone] = useState(true); // State to track phone number validity

  useEffect(() => {
    if (shippingInfo) {
      setFullName(shippingInfo?.fullName);
      setAddress(shippingInfo?.address);
      setCity(shippingInfo?.city);
      setState(shippingInfo?.state);
      setZipCode(shippingInfo?.zipCode);
      setPhoneNo(shippingInfo?.phoneNo);
      setCountry(shippingInfo?.country);
    }
  }, [shippingInfo]);

  const submiHandler = (e) => {
    e.preventDefault();

    if (!isValidPhone) {
      toast.error("Enter valid phone");
      return;
    }

    dispatch(
      saveShippingInfo({
        fullName,
        address,
        state,
        city,
        phoneNo,
        zipCode,
        country,
      }),
    );
    navigate("/confirm_order");
  };

  const handleCountrySelect = (countryName) => {
    setCountry(countryName);
    // Find the country object based on its name
    const selectedCountry = countriesList.find(
      (country) => country.name === countryName,
    );
    if (selectedCountry) {
      const countryCode = selectedCountry.phone;
      setSelectedCountryCode(countryCode);
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhoneNo(value);

    const phoneRegex = /^\d{10}$/;

    setIsValidPhone(phoneRegex.test(value));
  };

  return (
    <>
      <Metadata title={"Enter Shipping Info"}></Metadata>
      <div className="sticky top-20 z-10 w-full bg-gray-900 rounded-box mx-auto">
        <CheckoutSteps shipping />
      </div>
      <div className="flex flex-col justify-center items-center bg-base-100 dark:bg-gray-900">
        <form className=" w-full sm:w-3/4 p-6 sm:py-12" onSubmit={submiHandler}>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="floating_full_name"
                id="floating_full_name"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
                required
              />
              <label
                htmlFor="floating_full_name"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Full Name
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="floating_address"
                id="floating_address"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                required
              />
              <label
                htmlFor="floating_address"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Address
              </label>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="floating_city"
                id="floating_city"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={(e) => setCity(e.target.value)}
                value={city}
                required
              />
              <label
                htmlFor="floating_city"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                City
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="floating_state"
                id="floating_state"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={state}
                required
                onChange={(e) => setState(e.target.value)}
              />
              <label
                htmlFor="floating_state"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                State
              </label>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="floating_zip"
                id="floating_zip"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900  bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                required
              />
              <label
                htmlFor="floating_zip"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                ZIP Code
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <select
                className="select select-bordered w-full  dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-2 border-gray-300"
                defaultValue="India"
                onChange={(e) => handleCountrySelect(e.target.value)}
              >
                {countriesList?.map((country) => (
                  <option key={country?.name} value={country.name}>
                    {country?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group flex gap-4">
              <input
                type="text"
                id="floating_code"
                value={`+${selectedCountryCode}`}
                className=" w-16 text-sm text-center bg-transparent text-gray-900 dark:text-gray-100 border-2 rounded-lg"
                readOnly
              />
              <div className="relative w-full">
                <input
                  type="tel"
                  name="floating_phone"
                  id="floating_phone"
                  className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                    isValidPhone ? "" : "border-red-500"
                  }`}
                  placeholder=" "
                  onChange={handlePhoneChange}
                  required
                  value={phoneNo}
                />
                <label
                  htmlFor="floating_phone"
                  className={`peer-focus:font-medium absolute text-lg px-3 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-20 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-2/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-200 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                    isValidPhone ? "" : "-translate-y-16 text-red-500"
                  }`}
                >
                  Phone
                </label>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Shipping;
