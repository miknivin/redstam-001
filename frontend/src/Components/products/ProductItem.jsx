import React from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import "./product-item.css";
import { useDispatch } from "react-redux";
import { setCartItem } from "../../redux/features/cartSlice";
import toast from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import GardientButton from "../utilities/GardientButton";
import { motion } from "framer-motion";
function ProductItem({ product }) {
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
      x: -50,
    },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  const fadeInAnimationVariants = {
    initial: {
      opacity: 0,
      y: 100,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const dispatch = useDispatch();
  const setItemToCart = () => {
    const cartItem = {
      product: product?._id,
      name: product?.name,
      price: product?.price,
      image: product?.images[0]?.url,
      stock: product?.stock,
      quantity: 1,
    };

    dispatch(setCartItem(cartItem));
    toast.success("Item added to Cart");
  };
  return (
    <section className="bg-transparent">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <motion.div
          variants={variants}
          initial={"hidden"}
          whileInView={"show"}
          className="mr-auto place-self-center lg:col-span-7"
        >
          <motion.h1
            variants={item}
            className="max-w-2xl mb-2 text-4xl font-bold tracking-tight leading-none text-gray-900 md:text-5xl xl:text-5xl font-bcf"
          >
            {product.name}
          </motion.h1>
          <motion.div variants={item} class="flex items-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-yellow-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <p class="text-gray-600 font-bold text-sm ml-1">
              {product?.ratings}
              <span class="text-gray-500 font-normal ms-1">
                ({product?.numOfReviews} reviews)
              </span>
            </p>
          </motion.div>
          <motion.p
            variants={item}
            className="max-w-2xl mb-6 font-thin text-slate-900 lg:mb-8 md:text-lg  line-clamp-[8] font-calibri"
          >
            {product?.shortDescription || product?.description}
          </motion.p>
          <div className="card-body items-start p-0 my-3">
            {/* <div className="price flex justify-around items-start gap-4 w-40">
            <s className="text-2xl">₹{Math.ceil(product.price * 2)}</s>
            <p className="text-red-400 text-sm">₹{Math.ceil(product.price)}</p>
          </div> */}
          </div>
          <motion.div
            variants={item}
            className="flex items-center justify-start space-x-4"
          >
            <div onClick={setItemToCart}>
              <GardientButton text={"Add to Cart"} />
            </div>
            <Link
              to={`products/${product._id}`}
              className="inline-flex font-calibri items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-700  rounded-lg hover:bg-gray-800 hover:text-gray-100 focus:ring-4 focus:ring-gray-100 dark:border-gray-900"
            >
              Know more
            </Link>
          </motion.div>
        </motion.div>
        <motion.div
          variants={fadeInAnimationVariants}
          initial="initial"
          whileInView={"animate"}
          className=" block lg:mt-0 lg:col-span-5 lg:flex my-4 overflow-hidden w-full md:max-w-lg"
        >
          <Swiper
            modules={[Navigation, A11y, Autoplay]}
            autoplay={{ delay: 3000 }}
            loop
            spaceBetween={50}
            slidesPerView={1}
          >
            {product.images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image.url}
                  alt={`Productimg ${index + 1}`}
                  className="rounded-box aspect-square object-cover overflow-hidden"
                  loading="lazy"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}

export default ProductItem;
