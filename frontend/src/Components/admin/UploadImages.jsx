import React, { useEffect, useRef, useState } from "react";
import {
  useDeleteProductImageMutation,
  useGetProductDetailsQuery,
  useUploadProductImagesMutation,
} from "../../redux/api/productsApi";

import toast from "react-hot-toast";

const UploadImages = ({ productId, productName, closeModal }) => {
  const fileInputRef = useRef(null);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [deletedImageId, setDeletedImageId] = useState(null);

  const [uploadProductImages, { isLoading, error, isSuccess }] =
    useUploadProductImagesMutation();

  const { data, isLoading: isProductLoading } =
    useGetProductDetailsQuery(productId);

  const [
    deleteProductImage,
    {
      isLoading: isDeleteLoading,
      error: deleteError,
      isSuccess: isDeleteImageSuccess,
    },
  ] = useDeleteProductImageMutation();

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const handleResetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImagePreviewDelete = (image) => {
    const filteredImagesPreview = imagesPreview.filter((img) => img !== image);
    setImages(filteredImagesPreview);
    setImagesPreview(filteredImagesPreview);
  };

  useEffect(() => {
    if (data?.productById) {
      setUploadedImages(data?.productById?.images);
    }

    if (error) {
      toast.error(error?.data?.message);
    }

    if (isDeleteImageSuccess) {
      setUploadedImages((prevImages) =>
        prevImages.filter((img) => img.public_id !== deletedImageId),
      );
    }

    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }

    if (isSuccess) {
      setImagesPreview([]);
      closeModal();
      toast.success("Images Uploaded");
    }
  }, [
    data,
    error,
    isSuccess,
    deleteError,
    closeModal,
    isDeleteImageSuccess,
    deletedImageId,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    uploadProductImages({ id: productId, body: { images } });
  };

  const deleteImage = (imgId) => {
    if (uploadedImages.length === 1) {
      toast.error("There are no images to preview");
      closeModal();
      return;
    }
    deleteProductImage({ id: productId, body: { imgId } });
    setDeletedImageId(imgId);
  };

  return (
    <div>
      <form action="" encType="multipart/form-data" onSubmit={submitHandler}>
        <div className="w-full h-full flex flex-col items-center justify-center bg-transparent">
          <h1 className=" text-2xl sm:text-3xl text-gray-100 mt-3 font-medium">
            Upload Product Images
          </h1>
          <p className=" text-sm text-gray-300 mb-3 font-light">
            {productName}
          </p>
          <div>
            <input
              ref={fileInputRef}
              type="file"
              className="file-input file-input-bordered w-full max-w-xs"
              onChange={onChange}
              multiple
              onClick={handleResetFileInput}
            />
          </div>
          <div>
            <div className="my-4 text-xl text-gray-300">
              <h1>New Images</h1>
            </div>
            <div className="flex gap-3 my-3">
              {imagesPreview?.map((img, index) => (
                <div key={index} className="relative indicator">
                  <button
                    onClick={() => handleImagePreviewDelete(img)}
                    className="badge indicator-item bg-transparent border-none cursor-pointer"
                  >
                    <i className="fa-solid fa-xmark text-white p-1 bg-red-600 rounded-md"></i>
                  </button>
                  <img
                    key={index}
                    className="mask mask-squircle w-24 object-cover aspect-square"
                    src={img}
                    alt="new-images"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="my-4 text-xl text-gray-300">
            <h1>Product Uploaded Images</h1>
          </div>
          <div className="flex flex-wrap gap-3 my-4">
            {isProductLoading && (
              <div className="my-2 text-xl text-gray-300 flex justify-center">
                <span className="loading loading-spinner loading-md"></span>
              </div>
            )}
            {uploadedImages?.map((img, index) => (
              <div key={index} className="relative indicator">
                <button
                  disabled={isLoading || isDeleteLoading}
                  onClick={() => deleteImage(img?.public_id)}
                  className="badge indicator-item bg-transparent border-none cursor-pointer"
                >
                  <i className="fa-solid fa-xmark text-white p-1 bg-red-600 rounded-md"></i>
                </button>
                <img
                  key={index}
                  className="mask mask-squircle w-24 object-cover aspect-square"
                  src={img?.url}
                  alt="new-images"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="btn w-100 py-3 bg-emerald-600 hover:bg-emerald-800  text-white mx-auto"
            disabled={isLoading || isDeleteLoading}
          >
            {isLoading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadImages;
