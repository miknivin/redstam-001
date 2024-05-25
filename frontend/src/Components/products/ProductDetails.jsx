import React, { useEffect, useState } from "react";
import {
  useCanUserReviewQuery,
  useGetProductDetailsQuery,
} from "../../redux/api/productsApi";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../Layouts/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setCartItem } from "../../redux/features/cartSlice";
import NoResultPage from "../utilities/NoResultPage";
import Reviews from "../reviews/Reviews";
import NewReview from "../reviews/NewReview";
import Modals from "../utilities/Modals";
import ListReviews from "../reviews/ListReviews";
import StarRatings from "react-star-ratings";
import Testimonials from "../extras/Testimonials";
const ProductDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [activeImg, setActiveImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState("1");
  const [readMore, setReadMore] = useState(false);
  const { data, error, isLoading, isError } = useGetProductDetailsQuery(
    params?.id,
  );
  const { isAuthenticated } = useSelector((state) => state.auth);
  const product = data?.productById;
  const { data: canUserReview } = useCanUserReviewQuery(params?.id);
  const canReview = canUserReview?.canReview;
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setActiveImage(
      product?.images[0]
        ? product?.images[0]?.url
        : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.cureuppharma.in%2Fdummy%2F&psig=AOvVaw29IYEOkobIC4aMEjkiKBoN&ust=1702307845706000&source=images&cd=vfe&ved=0CBIQjRxqFwoTCJj4sIqVhYMDFQAAAAAdAAAAABAE",
    );
  }, [product]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [error?.data?.message, isError]);

  const increseQty = () => {
    const count = document.querySelector(".count");
    const currentQty = parseInt(count.value, 10);

    if (isNaN(currentQty) || currentQty >= product?.stock) return;

    const qty = currentQty + 1;
    setQuantity(qty);
  };

  const decreseQty = () => {
    const count = document.querySelector(".count");
    const currentQty = parseInt(count.value, 10);

    if (isNaN(currentQty) || currentQty <= 1) return;

    const qty = currentQty - 1;
    setQuantity(qty);
  };

  const setItemToCart = () => {
    const cartItem = {
      product: product?._id,
      name: product?.name,
      price: product?.price,
      image: product?.images[0]?.url,
      stock: product?.stock,
      quantity,
    };

    dispatch(setCartItem(cartItem));
    toast.success("Item added to Cart");
    console.log("Cart item");
    console.log(cartItem);
  };
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when the component mounts
  }, []);

  if (isLoading) return <Loader />;

  if (error && error?.status === 404) {
    return <NoResultPage />;
  }
  return (
    <div>
      <div className="bg-gray-100  text-gray-950 py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
          <div className="grid gap-12 md:grid-cols-2">
            {/* images - start */}
            <div className="grid gap-4 lg:grid-cols-5">
              <div className="order-last flex gap-4 lg:order-none lg:flex-col">
                {product?.images?.map((img) => (
                  <div
                    className={`overflow-hidden rounded-lg bg-gray-100 shadow-md border-2  ${img?.url === activeImg ? " border-emerald-500" : ""}`}
                  >
                    <img
                      src={img?.url}
                      loading="lazy"
                      alt={product?.name}
                      className="h-auto w-full object-cover object-center aspect-square"
                      onClick={(e) => setActiveImage(img?.url)}
                    />
                  </div>
                ))}
              </div>
              <div className="relative overflow-hidden rounded-lg bg-gray-100 lg:col-span-4">
                <img
                  src={activeImg}
                  loading="lazy"
                  alt="by Himanshu Dewangan"
                  className="h-full max-h-[80vh] w-full object-cover object-center aspect-square border-2 rounded-md"
                />
                {/* <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
                sale
            </span> */}
                {/* <a
                  href="/"
                  className="absolute right-4 top-4 inline-block rounded-lg border bg-white px-3.5 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:text-gray-700 md:text-base"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </a> */}
              </div>
            </div>
            {/* images - end */}
            {/* content - start */}
            <div className="md:py-8">
              {/* name - start */}
              <div className="mb-2 md:mb-3">
                {/* <span className="mb-0.5 inline-block">{product.category}</span> */}
                <h2 className="text-2xl font-bold  lg:text-3xl">
                  {product?.name}
                </h2>
              </div>
              {/* name - end */}
              {/* rating - start */}
              <div className="mb-6 flex items-center gap-3 md:mb-10">
                <div className="flex h-7 items-center gap-1 rounded-full bg-red-500 px-2 text-white">
                  <span className="text-sm">{product?.ratings}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-400 transition duration-100">
                  {product?.numOfReviews} ratings
                </span>
              </div>
              <div className='text-xl transition duration-100 pb-2 {product.stock>0?"font-bold":"text-red-700"}'>
                <h3
                  className={
                    product?.stock > 0
                      ? "text-green-600 font-semibold"
                      : "text-red-700 font-semibold"
                  }
                >
                  {product?.stock > 0 ? "In Stock" : "Out of Stock"}
                </h3>
              </div>
              {/* rating - end */}
              {/* color - start */}
              {/* <div className="mb-4 md:mb-6">
            <span className="mb-3 inline-block text-sm font-semibold text-gray-500 md:text-base">
                Color
            </span>
            <div className="flex flex-wrap gap-2">
                <span className="h-8 w-8 rounded-full border bg-gray-800 ring-2 ring-gray-800 ring-offset-1 transition duration-100" />
                <button
                type="button"
                className="h-8 w-8 rounded-full border bg-gray-500 ring-2 ring-transparent ring-offset-1 transition duration-100 hover:ring-gray-200"
                />
                <button
                type="button"
                className="h-8 w-8 rounded-full border bg-gray-200 ring-2 ring-transparent ring-offset-1 transition duration-100 hover:ring-gray-200"
                />
                <button
                type="button"
                className="h-8 w-8 rounded-full border bg-white ring-2 ring-transparent ring-offset-1 transition duration-100 hover:ring-gray-200"
                />
            </div>
            </div> */}
              {/* color - end */}
              {/* quantity - start */}
              <div className="flex justify-start gap-3">
                <span className="btn bg-slate-500 minus" onClick={decreseQty}>
                  -
                </span>
                <input
                  type="text"
                  className="form-control count bg-transparent border-2  text-center rounded w-[3rem]"
                  value={quantity}
                  onChange={(e) => {
                    let newValue = parseInt(e.target.value, 10);
                    if (isNaN(newValue) || newValue < 0) {
                      newValue = 0;
                    } else if (newValue > product?.stock) {
                      newValue = product?.stock;
                    }
                    setQuantity(newValue);
                  }}
                />
                <span className="btn bg-slate-500 plus" onClick={increseQty}>
                  +
                </span>
              </div>

              {/* quantity - end */}
              {/* price - start */}
              <div className="mb-4">
                <div className="flex items-end gap-2">
                  <span className="text-xl font-bold  md:text-2xl">
                    ₹{Math.ceil(product.price) * quantity}
                  </span>
                  <span className="mb-0.5 text-red-400 line-through">
                    ₹{Math.ceil(product.price * 2) * quantity}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  incl. VAT plus shipping
                </span>
              </div>
              {/* price - end */}
              {/* shipping notice - start */}
              <div className="mb-6 flex items-center gap-2 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                  />
                </svg>
                <span className="text-sm">2-4 day shipping</span>
              </div>
              {/* shipping notice - end */}
              {/* buttons - start */}
              <div className="flex gap-2.5">
                <button
                  onClick={setItemToCart}
                  className="inline-block flex-1 rounded-lg bg-emerald-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-teal-400 focus-visible:ring active:bg-teal-700 sm:flex-none md:text-base"
                >
                  Add to cart
                </button>
                {/* <button className="inline-block rounded-lg bg-red-700 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-red-300 transition duration-100 hover:bg-red-500 focus-visible:ring active:text-gray-700 md:text-base">
                  Buy now
                </button> */}
              </div>
              {/* buttons - end */}
              <div className="flex flex-col my-5">
                <p
                  className={`${readMore ? "" : "line-clamp-4"} whitespace-break-spaces`}
                >
                  {product?.longDescription || product?.description}
                </p>
                <span
                  onClick={() => setReadMore(!readMore)}
                  className="text-info cursor-pointer"
                >
                  {readMore ? "Read less" : "Read more"}
                </span>
              </div>
            </div>
            {/* content - end */}
          </div>
          <div className="my-4">
            <Testimonials />
          </div>
          {/* <div className="my-2">
            {isAuthenticated && canReview ? (
              <div className="w-full flex justify-center">
                <button
                  onClick={openModal}
                  className="btn btn-success mx-auto text-xl my-2"
                >
                  Submit your Review
                </button>
              </div>
            ) : (
              <div role="alert" className="alert alert-warning w-fit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span>You need to login to write review</span>
              </div>
            )}
            {product?.reviews?.length > 0 && (
              <ListReviews reviews={product?.reviews} />
            )}
          </div> */}
          <Modals isOpen={isModalOpen} onRequestClose={closeModal}>
            <NewReview productId={product?._id} closeModal={closeModal} />
          </Modals>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
