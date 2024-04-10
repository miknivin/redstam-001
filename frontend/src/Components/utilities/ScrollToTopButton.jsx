import React, { useState, useEffect } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const scrollHandler = () => {
      const scrolled = document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollPercentage = (scrolled / (scrollHeight - windowHeight)) * 100;
      setIsVisible(scrollPercentage > 20);
    };

    window.addEventListener("scroll", scrollHandler);

    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed right-3 bottom-3 group p-8 z-[99999999] transition-all ease-in delay-500 flex items-center justify-center text-white bg-gradient-to-br from-red-600 to-red-900 rounded-full w-14 h-14 hover:bg-gradient-to-tl focus:ring-4 focus:ring-red-300 focus:outline-none dark:focus:ring-red-200"
        >
          <i className="fa-solid fa-chevron-up text-xl md:text-3xl"></i>
          <span className="sr-only">Scroll to top</span>
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
