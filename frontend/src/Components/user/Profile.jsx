import React, { useEffect, useState } from "react";
import UserLayout from "../Layouts/UserLayout";
import { useSelector } from "react-redux";
import { useUploadAvatarMutation } from "../../redux/api/userApi";
import toast from "react-hot-toast";
const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const { shippingInfo } = useSelector((state) => state.cart);
  const [showFileInput, setShowFileInput] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    user?.avatar
      ? user?.avatar?.url
      : "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png",
  );

  const [uploadAvatar, { isLoading, error, isSuccess }] =
    useUploadAvatarMutation();

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.error("No file selected");
      return;
    }

    if (!file.type.startsWith("image/")) {
      console.error("Selected file is not an image");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(file);
    console.log(reader, "--reader");
  };

  const handleUploadClick = () => {
    setShowFileInput(true);
  };

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("Avatar Uploaded");
      setShowFileInput(false);
    }
  }, [error, isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();

    const userData = {
      avatar,
    };

    uploadAvatar(userData);
  };

  return (
    <UserLayout>
      <div className=" w-ful">
        {/* https://gist.github.com/goodreds/5b8a4a2bf11ff67557d38c5e727ea86c */}
        <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 mb-14 bg-white shadow-xl rounded-lg text-gray-900">
          <div className="rounded-t-lg h-32 overflow-hidden bg-gradient-to-tr from-red-900 via-red-700 to-red-500"></div>
          <div className="mx-auto w-32 h-32 relative -mt-16 overflow-hidden ">
            <img
              className="object-cover object-center h-32 rounded-full bg-blend-multiply bg-gray-200"
              src={
                user?.avatar
                  ? user?.avatar?.url
                  : "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
              }
              alt="avatar"
            />
            <div className="absolute bottom-2 right-4 w-fit cursor-pointer">
              <button id="upload_button" onClick={() => handleUploadClick()}>
                <i className="fa-solid fa-pen text-blue-600 text-xl bg-slate-50 p-2 rounded-lg"></i>
              </button>
            </div>
          </div>
          {showFileInput && (
            <>
              <button
                className=" w-full flex justify-end "
                onClick={() => setShowFileInput(!showFileInput)}
              >
                <i className="fa-solid fa-xmark text-xl pe-3"></i>
              </button>
              <form
                className="flex justify-center items-center px-3"
                onSubmit={submitHandler}
              >
                <div className="avatar">
                  <div className=" w-12 rounded-full me-2">
                    <img src={avatarPreview} alt="avatar" />
                  </div>
                </div>
                <input
                  type="file"
                  className="file-input file-input-bordered file-input-accent bg-transparent w-full max-w-xs "
                  onChange={handleFileInputChange}
                />
                <button className=" ms-2 w-fit" type="submit">
                  {isLoading ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    <i className="fa-solid fa-arrow-right text-2xl"></i>
                  )}
                </button>
              </form>
            </>
          )}
          <h1 className="pt-2 text-gray-700 text-center text-xl font-medium">
            Hello {user?.name || "User"}
          </h1>
          <div className="text-center mt-2">
            {/* <p className="text-gray-500">Freelance Web Designer</p> */}
          </div>
          <ul className="py-4 mt-2 text-gray-700 flex flex-col items-start justify-around text-start mx-16 gap-2">
            <li className="flex flex-row items-center justify-around gap-2">
              <i className="fa-solid fa-envelope"></i>
              <div>{user?.email}</div>
            </li>
            <li className="flex flex-row items-center justify-around gap-2">
              <i className="fa-solid fa-phone"></i>
              <div>{user?.phone}</div>
            </li>
            <li className="flex flex-row items-center justify-around gap-2">
              <i className="fa-solid fa-calendar-days"></i>
              <div>{user?.createdAt?.substring(0, 10)}</div>
            </li>
            <li className="flex flex-row items-center justify-around gap-2">
              <i className="fa-solid fa-location-dot"></i>
              <div>{shippingInfo?.address}</div>
            </li>
          </ul>
          <div className="p-4 border-t mx-8 mt-2 flex justify-around gap-5">
            {/* <button className="btn btn-primary w-1/2 mx-3">Orders</button> */}
            {/* <button className="btn btn-accent w-1/2 mx-3">Wishlist</button> */}
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default Profile;
