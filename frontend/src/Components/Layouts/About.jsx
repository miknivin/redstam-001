import React, { useEffect, useState } from "react";
import Mission from "./Mission";

const About = () => {
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when the component mounts
  }, []);

  return (
    <div>
      <section className=" bg-slate-950">
        <div class="text-center block relative z-20 mx-auto pt-8">
          <h1 class="text-5xl font-light my-2 text-gray-50">
            Embracing Nature's Ancient Wisdom
          </h1>
          <p className="text-lg w-full md:w-3/4 mx-auto font-light text-gray-200">
            In the heart of a pristine natural sanctuary, where the whispers of
            ancient knowledge echo through time, REDSTAM stands as a testament
            to the enduring power of nature's healing embrace. Founded upon the
            principles of reverence for the earth's bountiful gifts and a
            relentless pursuit of holistic well-being, our journey is a symphony
            of tradition and innovation.
          </p>
        </div>
        <div className="gap-16 items-center py-4 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-8 lg:px-6">
          <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="mb-4 text-4xl tracking-tight font-light text-gray-50">
              REDISCOVERING NATURE'S EMBRACE:{" "}
              <span className=" text-red-500">The Redstam Journey</span>
            </h2>
            <p
              className={`mb-4 font-light text-gray-200 ${showMore ? "" : "line-clamp-[9]"}  md:text-lg lg:text-xl`}
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
              potential. Our flagship products, Herbal Honey and REDSTAM Veg.
              Capsules are living embodiments of this philosophy, crafted from
              the purest, all-natural ingredients to harness the restorative
              powers of nature's ancient secrets.
            </p>
            <button
              className="btn  btn-info"
              onClick={() => setShowMore(!showMore)}
            >
              Read More
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <img
              className="w-full rounded-lg"
              src="https://ik.imagekit.io/c1jhxlxiy/58f59181-ed02-4683-9b5b-f4f4e1412de6.jpg?updatedAt=1710838864444"
              alt="office content 1"
            />
            <img
              className="mt-4 w-full lg:mt-10 rounded-lg"
              src="https://ik.imagekit.io/c1jhxlxiy/9d31e125-a164-4fb9-9bf5-62fb00ccda62.jpg?updatedAt=1710838864478"
              alt="office content 2"
            />
          </div>
        </div>
      </section>
      <Mission />
    </div>
  );
};

export default About;
