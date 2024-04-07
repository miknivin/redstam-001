import React from "react";
import { Link } from "react-router-dom";
const Mission = () => {
  return (
    <div>
      <div class="text-center block relative z-20 mx-auto pt-8 bg-base-200">
        <h1 class="text-5xl font-light my-2">
          Empowering Wellness Through Nature
        </h1>
        <p className="text-lg w-full md:w-3/4 mx-auto font-light">
          At REDSTAM, we fuse ancient wisdom with modern science to unlock
          nature's secrets for vibrant living. Our ethical practices ensure
          harmony with the planet, while our products empower individuals to
          thrive in body, mind, and soul. Join us on the journey to holistic
          well-being.
        </p>
        <Link
          to="/"
          className="btn bg-red-600 hover mx-auto  mb-10 mt-5 text-white"
        >
          Shop now
        </Link>
      </div>
    </div>
  );
};

export default Mission;
