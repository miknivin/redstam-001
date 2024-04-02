import React, { useState } from "react";
import { useGetAdminProductsQuery } from "../../redux/api/productsApi";
import AdminLayout from "../Layouts/AdminLayout";
import Modals from "../utilities/Modals";
import UpdateProduct from "./UpdateProduct";
import DangerConfirm from "../utilities/DangerConfirm";
import UploadImages from "./UploadImages";

const ListProducts = () => {
  const { data, isLoading } = useGetAdminProductsQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImgModalOpen, setIsImgModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProductName, setSelectedProductName] = useState(null); // Add selectedProductName state

  const openModal = (id, name) => {
    // Modify openModal to accept product name
    setSelectedProductId(id);
    setSelectedProductName(name); // Set selectedProductName
    setIsModalOpen(true);
  };

  const openImgModal = (id, name) => {
    setSelectedProductName(name);
    setSelectedProductId(id);
    setIsImgModalOpen(true);
  };

  const closeImgModal = () => {
    setIsImgModalOpen(false);
    setSelectedProductId(null);
    setSelectedProductName(null);
  };

  const openConfirm = (id, name) => {
    setIsConfirmModalOpen(true);
    setSelectedProductId(id);
    setSelectedProductName(name);
  };

  const closeModal = () => {
    setSelectedProductId(null);
    setSelectedProductName(null); // Reset selectedProductName
    setIsModalOpen(false);
    setIsConfirmModalOpen(false);
  };

  const handleClose = () => {
    // Define handleClose function
    closeModal();
  };
  return (
    <AdminLayout>
      <div className="overflow-x-auto">
        <table className="table text-gray-200">
          <thead className=" text-gray-100 text-lg">
            <tr>
              {/* <th>
                <label>
                  <input type="checkbox" className="checkbox checkbox-accent" />
                </label>
              </th> */}
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={10}>
                  <span className="loading loading-dots loading-md"></span>
                </td>
              </tr>
            ) : (
              data?.allProducts?.map((product) => (
                <tr key={product?.id}>
                  {/* <td>
                    <label>
                      <input
                        type="checkbox"
                        className="checkbox checkbox-accent"
                      />
                    </label>
                  </td> */}
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={product.images[0].url}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{product.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>{product?.category}</td>
                  <td>{product?.price}</td>
                  <td>{product?.stock}</td>
                  <td>
                    <div className=" flex flex-wrap gap-2">
                      <button
                        onClick={() => openModal(product._id)}
                        className="btn btn-neutral btn-xs"
                      >
                        <i className="fa-solid fa-pencil"></i>
                      </button>
                      <button
                        onClick={() => openImgModal(product._id, product.name)}
                        className="btn btn-neutral btn-xs"
                      >
                        <i className="fa-solid fa-camera-retro"></i>
                      </button>
                      <button
                        onClick={() => openConfirm(product._id, product.name)}
                        className="btn btn-error btn-xs"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          {/* <tfoot>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th></th>
          </tr>
        </tfoot> */}
        </table>
        <div className=" flex justify-center my-3">
          <div className="join border">
            <button className="join-item btn">«</button>
            <button className="join-item btn btn-active">1</button>
            <button className="join-item btn">2</button>
            <button className="join-item btn">»</button>
          </div>
        </div>
      </div>
      <Modals isOpen={isModalOpen} onRequestClose={closeModal}>
        <UpdateProduct productId={selectedProductId} closeModal={closeModal} />
      </Modals>
      {isConfirmModalOpen && (
        <DangerConfirm
          isOpen={isConfirmModalOpen}
          onRequestClose={closeModal}
          productId={selectedProductId}
          selectedProductName={selectedProductName}
          onClose={handleClose}
        />
      )}
      <Modals isOpen={isImgModalOpen} onRequestClose={closeImgModal}>
        <UploadImages
          productId={selectedProductId}
          productName={selectedProductName}
          closeModal={closeImgModal}
        />
      </Modals>
    </AdminLayout>
  );
};

export default ListProducts;
