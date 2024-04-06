import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Mission from "./Mission";

const About = () => {
  const [showMore, setShowMore] = useState(false);

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

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when the component mounts
  }, []);

  return (
    <div>
      <section className="bg-base-100 dark:bg-gray-950">
        <motion.div
          variants={variants}
          initial={"hidden"}
          whileInView={"show"}
          viewport={{ once: true }}
          className="text-center block relative z-20 mx-auto pt-8"
        >
          <motion.h1 className="text-5xl font-light my-2" variants={item}>
            Embracing Nature's Ancient Wisdom
          </motion.h1>
          <motion.p
            className="text-lg w-full md:w-3/4 mx-auto font-light"
            variants={item}
          >
            In the heart of a pristine natural sanctuary, where the whispers of
            ancient knowledge echo through time, REDSTAM stands as a testament
            to the enduring power of nature's healing embrace. Founded upon the
            principles of reverence for the earth's bountiful gifts and a
            relentless pursuit of holistic well-being, our journey is a symphony
            of tradition and innovation.
          </motion.p>
        </motion.div>
        <motion.div className="gap-16 items-center py-4 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-8 lg:px-6">
          <motion.div
            variants={variants}
            initial={"hidden"}
            whileInView={"show"}
            viewport={{ once: true }}
            className="font-light text-gray-500 sm:text-lg dark:text-gray-400"
          >
            <motion.h2
              variants={item}
              className="mb-4 text-4xl tracking-tight font-light"
            >
              REDISCOVERING NATURE'S EMBRACE:{" "}
              <span className="bg-gradient-to-br from-pink-800 to-red-600 text-transparent bg-clip-text ">
                The Redstam Journey
              </span>
            </motion.h2>
            <motion.p
              variants={item}
              className={`mb-4 font-light ${
                showMore ? "" : "line-clamp-[9]"
              }  md:text-lg lg:text-xl`}
            >
              From the moment our story began, we have been guided by a profound
              respect for the wisdom of our ancestors, who understood the
              intricate dance between humankind and the natural world. Through
              meticulous research and unwavering dedication, our team of
              visionary experts has delved into the depths of botanical lore,
              unlocking the secrets that have nurtured civilizations for
              centuries. Within the hallowed walls of our advanced facilities,
              ancient wisdom and cutting-edge technology converge in a
              harmonious symphony. In our R&D laboratories which are sanctuaries
              of exploration, the most skilled individuals carefully extract,
              refine, and create formulations from nature's valuable resources,
              ensuring that their effectiveness and purity are maintained
              without compromise. At the heart of our endeavors lies a steadfast
              commitment to promoting exuberance, sturdiness, durability, and
              endurance – the cornerstones of a life lived to its fullest
              potential.
            </motion.p>
            <motion.button
              variants={item}
              className="bt relative inline-flex items-center justify-center p-0.5 my-4 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-800 to-red-600 group-hover:from-pink-700 group-hover:to-red-800 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
              onClick={() => setShowMore(!showMore)}
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-950 rounded-md group-hover:bg-opacity-0">
                Read {!showMore ? "More" : "Less"}
              </span>
            </motion.button>
          </motion.div>
          <motion.div
            variants={variants}
            initial={"hidden"}
            whileInView={"show"}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4 mt-8"
          >
            <motion.img
              variants={item}
              className="w-full rounded-lg"
              src="https://ik.imagekit.io/c1jhxlxiy/58f59181-ed02-4683-9b5b-f4f4e1412de6.jpg?updatedAt=1710838864444"
              alt="office content 1"
            />
            <motion.img
              variants={item}
              className="mt-4 w-full lg:mt-10 rounded-lg"
              src="https://ik.imagekit.io/c1jhxlxiy/9d31e125-a164-4fb9-9bf5-62fb00ccda62.jpg?updatedAt=1710838864478"
              alt="office content 2"
            />
          </motion.div>
        </motion.div>
      </section>
      <Mission />
    </div>
  );
};

export default About;
