import React from "react";
import { Link } from "react-router-dom";
import GardientButton from "../utilities/GardientButton";
import { motion } from "framer-motion";
const Mission = () => {
  const variants = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
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
    <div>
      <motion.div
        variants={variants}
        initial={"hidden"}
        whileInView={"show"}
        viewport={{ once: true }}
        class="text-center block relative z-20 mx-auto pt-8 bg-base-200 dark:bg-slate-950"
      >
        <motion.h1 variants={item} class="text-5xl font-light my-2">
          Empowering Wellness Through Nature
        </motion.h1>
        <motion.p
          variants={item}
          className="text-lg w-full md:w-3/4 mx-auto font-light"
        >
          At REDSTAM, we fuse ancient wisdom with modern science to unlock
          nature's secrets for vibrant living. Our ethical practices ensure
          harmony with the planet, while our products empower individuals to
          thrive in body, mind, and soul. Join us on the journey to holistic
          well-being.
        </motion.p>
        <motion.div variants={item} className="py-4">
          <Link to="/">
            <GardientButton text={"Shop Now"} />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Mission;
