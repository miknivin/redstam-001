import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PRODUCT_CATEGORIES } from "../../Constants/constants";
import AdminLayout from "../Layouts/AdminLayout";
import { useCreateProductMutation } from "../../redux/api/productsApi";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    shortDescription: "",
    longDescription: "",
    price: "",
    category: "",
    stock: "",
    images: [],
  });

  const [imagePreview, setImagePreview] = useState([]);

  const { name, shortDescription, longDescription, price, category, stock } = product;

  const [createProduct, { isLoading, error, isSuccess }] =
    useCreateProductMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("Product created");
      navigate("/admin/products");
    }
  }, [error, isSuccess, navigate]);

  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    createProduct(product);
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      console.error("No files selected");
      return;
    }

    const imageFiles = [];
    const previews = [];
    const maxFiles = Math.min(files.length, 4); // Limit to 4 files
    for (let i = 0; i < maxFiles; i++) {
      const file = files[i];
      if (!file.type.startsWith("image/")) {
        console.error(`Selected file ${file.name} is not an image`);
        continue;
      }

      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          imageFiles.push(reader.result);
          previews.push(reader.result);
          // Check if all files are loaded
          if (imageFiles.length === maxFiles) {
            // Set image preview for all files
            setImagePreview(previews);
            // Set images for submission
            setProduct({ ...product, images: imageFiles });
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <AdminLayout>
      <div className="relative p-4 bg-gray-200 rounded-lg shadow dark:bg-gray-800 sm:p-5">
        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Add Product
          </h3>
        </div>
        <form onSubmit={submitHandler}>
          <div className="grid gap-4 mb-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={onChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type product name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="stock"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Stock
              </label>
              <input
                type="number"
                name="stock"
                id="stock"
                value={stock}
                onChange={onChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Product stock"
                required
              />
            </div>
            <div>
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                value={price}
                onChange={onChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="2999"
                required
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={category}
                onChange={onChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option value="" disabled>
                  Select category
                </option>
                {PRODUCT_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="shortDescription"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Short Description
              </label>
              <textarea
                id="shortDescription"
                name="shortDescription"
                value={shortDescription}
                onChange={onChange}
                rows={3}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Write product description here"
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="longDescription"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Long Description
              </label>
              <textarea
                id="longDescription"
                name="longDescription"
                value={longDescription}
                onChange={onChange}
                rows={5}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Write product description here"
              />
            </div>
            <div className=" flex gap-3 items-center">
              <input
                type="file"
                className="file-input file-input-bordered bg-transparent w-full max-w-xs my-5"
                onChange={handleFileInputChange}
                required
                multiple
              />
              <div className=" flex gap-3">
                {imagePreview &&
                  imagePreview.map((img, index) => (
                    <img
                      key={index + 1}
                      className="mask mask-squircle w-12 h-12"
                      src={img}
                      alt="product images"
                    />
                  ))}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="text-white inline-flex items-center bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-primary-800"
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <>
                <svg
                  className="mr-1 -ml-1 w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Add new product
              </>
            )}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default NewProduct;
