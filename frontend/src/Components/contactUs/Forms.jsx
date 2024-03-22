import React, { useState } from "react";

const Forms = () => {
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    const formDataToSend = {
      ...formData,
      fullName: `${formData.firstName || ""} ${formData.lastName || ""}`,
      dateTime: new Date().toISOString(),
    };

    // Remove firstName and lastName from formDataToSend
    delete formDataToSend.firstName;
    delete formDataToSend.lastName;

    // Make both POST requests and race them
    Promise.race([
      fetch(
        "https://www.privyr.com/api/v1/incoming-leads/0vZfjMQw/scOQiAcg#generic-webhook",
        {
          method: "POST",
          mode: "cors", // Use "cors" instead of "no-cors"
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formDataToSend),
        },
      ),
      fetch(
        "https://drab-blue-ostrich-sari.cyclic.app/api/v1/contacts/create",
        {
          method: "POST",
          mode: "cors", // Use "cors" instead of "no-cors"
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formDataToSend),
        },
      ),
    ])
      .then((response) => {
        if (response.ok) {
          setSubmitted(true);
        } else {
          throw new Error("One or both requests failed");
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (submitted) {
    return (
      <div className="text-success text-3xl flex items-center justify-center">
        Form submitted successfully!
      </div>
    );
  }

  return (
    <div>
      <div className="w-full">
        <div>
          <h3
            className="text-3xl my-3 mb-5 leading-6 font-medium text-gray-100 dark:text-gray-50"
            id="modal-headline"
          >
            Submit the form
          </h3>
        </div>
        <form
          className="w-full h-full text-start mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2"
          onSubmit={handleFormSubmit}
        >
          <div>
            <label
              htmlFor="firstName"
              className="mb-2 inline-block text-sm text-gray-200 sm:text-base"
            >
              First name*
            </label>
            <input
              name="firstName"
              required
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-900 dark:bg-gray-50 dark:text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              value={formData?.firstName || ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="mb-2 inline-block text-sm text-gray-200 sm:text-base"
            >
              Last name
            </label>
            <input
              name="lastName"
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-900 dark:bg-gray-50 dark:text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              value={formData.lastName || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="phone"
              className="mb-2 inline-block text-sm text-gray-200 sm:text-base"
            >
              Phone*
            </label>
            <input
              name="phone"
              required
              type="tel"
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-900 dark:bg-gray-50 dark:text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              value={formData.phone || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="mb-2 inline-block text-sm text-gray-200 sm:text-base"
            >
              Email*
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-900 dark:bg-gray-50 dark:text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              value={formData.email || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="company"
              className="mb-2 inline-block text-sm text-gray-200 sm:text-base"
            >
              Company Name
            </label>
            <input
              name="companyName"
              type="text"
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-900 dark:bg-gray-50 dark:text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              value={formData.companyName || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="mb-2 inline-block text-sm text-gray-200 sm:text-base"
            >
              Message
            </label>
            <textarea
              name="message"
              className="h-24 w-full rounded border bg-gray-50 px-3 py-2 text-gray-900 dark:bg-gray-50 dark:text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              defaultValue={""}
              value={formData.message || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center justify-between sm:col-span-2">
            <button
              type="submit"
              className=" bg-red-600 inline-block rounded-lg px-8 py-3 text-center text-sm font-light text-white outline-none ring-red-300 transition duration-100 hover:bg-red-700 focus-visible:ring active:bg-red-800 md:text-base"
              disabled={loading} // Disable the button when loading
            >
              {loading ? (
                <>
                  Sending{" "}
                  <span className="loading loading-spinner loading-xs align-middle"></span>
                </>
              ) : (
                "Send"
              )}
            </button>
            <span className="text-sm text-gray-500">*Required</span>
          </div>
          {/* <p className="text-xs text-gray-400">
            By signing up to our newsletter you agree to our{"{"}" "{"}"}
            <a
              href="#mn"
              className="underline transition duration-100 hover:text-indigo-500 active:text-indigo-600"
            >
              Privacy Policy
            </a>
            .
          </p> */}
        </form>
      </div>
    </div>
  );
};

export default Forms;
