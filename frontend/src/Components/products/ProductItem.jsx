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

function ProductItem({ product }) {
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
    // console.log("Cart item");
    // console.log(cartItem);
  };
  return (
    <section className="bg-transparent">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-light tracking-tight leading-none text-gray-100 md:text-5xl xl:text-6xl dark:text-white">
            {product.name}
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400 line-clamp-[8]">
            {product.description}
          </p>
          <div className="card-body items-start p-0 my-3">
            {/* <div className="price flex justify-around items-start gap-4 w-40">
            <s className="text-2xl">₹{Math.ceil(product.price * 2)}</s>
            <p className="text-red-400 text-sm">₹{Math.ceil(product.price)}</p>
          </div> */}
            <div className="rating">
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-orange-400"
                checked
              />
            </div>
          </div>
          <div className="flex items-center justify-start space-x-4">
            <button
              className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-red-600 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
              onClick={setItemToCart}
            >
              Add to Cart
            </button>
            <Link
              to={`products/${product._id}`}
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-200 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700"
            >
              Know more
            </Link>
          </div>
        </div>
        <div className=" block lg:mt-0 lg:col-span-5 lg:flex my-4 overflow-hidden w-full md:max-w-lg">
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
                  className="rounded-box aspect-square object-cover"
                  loading="lazy"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default ProductItem;
