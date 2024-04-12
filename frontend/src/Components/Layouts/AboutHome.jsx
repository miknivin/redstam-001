import React from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";

const AboutHome = () => {
  const { ref, inView } = useInView({ amount: 0.5 });

  const variants = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };
  return (
    <div className=" !bg-gray-100">
      <motion.div
        variants={variants}
        initial="hidden"
        whileInView={"show"}
        className="text-center block relative z-20 mx-auto pt-10 pb-3 "
        ref={ref}
      >
        <motion.h1
          className="text-3xl md:text-5xl my-2 text-gray-900 px-2 font-bcf font-bold"
          variants={item}
        >
          Embracing Nature's Ancient Wisdom
        </motion.h1>
        <motion.p
          className="text-lg w-full md:w-3/4 mx-auto font-light p-3 text-gray-700 font-calibri"
          variants={item}
        >
          In the heart of a pristine natural sanctuary, where the whispers of
          ancient knowledge echo through time, REDSTAM stands as a testament to
          the enduring power of nature's healing embrace. Founded upon the
          principles of reverence for the earth's bountiful gifts and a
          relentless pursuit of holistic well-being, our journey is a symphony
          of tradition and innovation.
        </motion.p>
        <motion.button variants={item} viewport={{ once: true }}>
          <Link
            to="about"
            className="relative inline-flex items-center justify-center p-0.5 my-4 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-500 to-red-500 group-hover:from-red-500 group-hover:to-red-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-red-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-100 text-gray-900 hover:text-gray-50 rounded-md group-hover:bg-opacity-0 font-calibri">
              Read More
            </span>
          </Link>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default AboutHome;
