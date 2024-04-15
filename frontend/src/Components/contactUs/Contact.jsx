import React, { useEffect } from "react";
import Forms from "./Forms";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <section data-section id="contactRef" className="bb-black bg-gray-50 ">
        <h1 className="text-center text-5xl pt-6 font-bold text-gray-900 font-bcf">
          Contact Us
        </h1>
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center bg-slate-900 lg:col-span-7 w-full lg:w-[90%] p-5 rounded-box">
            <Forms />
          </div>
          <div className="lg:mt-0 lg:col-span-5 lg:flex my-3">
            <ul class="mb-6 md:mb-0 pt-5 md:pt-14 font-calibri">
              <li class="flex">
                <div class="flex p-2 h-10 w-10 items-center justify-center rounded bg-red-600 text-gray-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="h-6 w-6"
                  >
                    <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                    <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
                  </svg>
                </div>
                <div class="ml-4 mb-4">
                  <h3 class="mb-2 text-lg font-medium leading-6 text-gray-900">
                    Our Address
                  </h3>
                  <p class="text-gray-700 dark:text-slate-700  normal-case">
                  GENFOR GLOBAL PVT LTD. M/s Vibgyor Net-Connections No.57,
                  </p>
                  <p class="text-gray-700 dark:text-slate-700  normal-case">
                  13th Cross ECS 6906904430, Hosur Road Anepalya,
                  </p>
                  <p class="text-gray-700 dark:text-slate-700 normal-case">
                   Banglore-560047, Karnataka
                  </p>
                </div>
              </li>
              <li class="flex">
                <div class="flex h-10 w-10 items-center justify-center rounded bg-red-600 text-gray-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="h-6 w-6"
                  >
                    <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
                    <path d="M15 7a2 2 0 0 1 2 2"></path>
                    <path d="M15 3a6 6 0 0 1 6 6"></path>
                  </svg>
                </div>
                <div class="ml-4 mb-4">
                  <h3 class="mb-2 text-lg font-medium leading-6 text-gray-900">
                    Contact
                  </h3>
                  <p class="text-gray-700 dark:text-slate-700 ">
                    Mobile:+91 8075 666 099
                  </p>
                  <p class="text-gray-700 dark:text-slate-700 ">
                    Mail: info@redstam.com
                  </p>
                </div>
              </li>
              <li class="flex">
                <div class="flex h-10 w-10 items-center justify-center rounded bg-red-600 text-gray-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="h-6 w-6"
                  >
                    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                    <path d="M12 7v5l3 3"></path>
                  </svg>
                </div>
                <div class="ml-4 mb-4">
                  <h3 class="mb-2 text-lg font-medium leading-6 text-gray-900">
                    Working hours
                  </h3>
                  <p class="text-gray-700 dark:text-slate-700 ">
                    Monday - Friday: 09:00 - 18:00
                  </p>
                  {/* <p class="text-gray-700 dark:text-slate-700 ">
                    Saturday &amp; Sunday: 08:00 - 12:00
                  </p> */}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
