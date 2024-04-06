import React from "react";
import { motion } from "framer-motion";
import benefitsData from "../utilities/benefits";

const Benefits = () => {
  const variants = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      scale: 0.5,
    },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div>
      <div className="py-16">
        <div className="max-w-screen-xl m-auto px-6 text-gray-500 md:px-12 xl:px-0">
          <motion.div
            variants={variants}
            initial={"hidden"}
            whileInView={"show"}
            viewport={{ once: true, amount: 0.4 }}
            className="mx-auto grid gap-6 md:w-3/4 lg:w-full lg:grid-cols-3"
          >
            {benefitsData.map((benefit, index) => (
              <motion.div
                key={index}
                variants={item}
                className="border border-gray-100 dark:border-gray-700 rounded-3xl bg-white dark:bg-gray-800 px-8 pt-12 shadow-2xl shadow-gray-600/10 dark:shadow-none sm:px-12 lg:px-8"
              >
                <div className="mb-12 space-y-4">
                  <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    {benefit.title}
                  </h3>
                  <p className="mb-6 text-gray-600 dark:text-gray-300">
                    {benefit.description}
                  </p>
                </div>
                <img
                  src={benefit.imageSrc}
                  className="ml-auto w-2/3"
                  alt="illustration"
                  loading="lazy"
                  width={900}
                  height={600}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
