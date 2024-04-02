import React from "react";
import { Link } from "react-router-dom";

const AboutHome = () => {
  return (
    <div className=" bg-base-100">
      <div class="text-center block relative z-20 mx-auto pt-10 pb-3 ">
        <h1 class="text-5xl font-light my-2">
          Embracing Nature's Ancient Wisdom
        </h1>
        <p className="text-lg w-full md:w-3/4 mx-auto font-light">
          In the heart of a pristine natural sanctuary, where the whispers of
          ancient knowledge echo through time, REDSTAM stands as a testament to
          the enduring power of nature's healing embrace. Founded upon the
          principles of reverence for the earth's bountiful gifts and a
          relentless pursuit of holistic well-being, our journey is a symphony
          of tradition and innovation.
        </p>
        <Link
          to="about"
          className="btn bg-red-600 hover:bg-red-400 mx-auto  mt-5 mb-8 text-white"
        >
          Know More
        </Link>
      </div>
    </div>
  );
};

export default AboutHome;
