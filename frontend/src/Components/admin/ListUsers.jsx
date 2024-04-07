import React, { useEffect, useState } from "react";
import SkeletonText from "../utilities/SkeletonText";
import { toast } from "react-hot-toast";
import { MDBDataTable } from "mdbreact";
import {
  useDeleteUserMutation,
  useGetAdminUsersQuery,
} from "../../redux/api/userApi";
import Metadata from "../Layouts/Metadata";
import AdminLayout from "../Layouts/AdminLayout";
import Modals from "../utilities/Modals";
import UpdateUser from "./UpdateUser";

const ListUsers = () => {
  const { data, isLoading, error } = useGetAdminUsersQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const openModal = (id) => {
    setSelectedUserId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUserId(null); // Reset selectedProductName
    setIsModalOpen(false);
  };

  const [
    deleteUser,
    { error: deleteError, isLoading: isDeleteLoading, isSuccess },
  ] = useDeleteUserMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }

    if (isSuccess) {
      toast.success("User Deleted");
    }
  }, [error, deleteError, isSuccess]);

  const deleteUserHandler = (id) => {
    deleteUser(id);
  };

  const setUsers = () => {
    const users = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
          label: "Role",
          field: "role",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    data?.users?.forEach((user) => {
      users.rows.push({
        id: user?._id,
        name: user?.name,
        email: user?.email,
        role: user?.role,
        actions: (
          <>
            <button
              onClick={() => openModal(user?._id)}
              className="btn btn-outline-primary"
            >
              <i className="fa fa-pencil"></i>
            </button>

            <button
              className="btn btn-outline-danger ms-2"
              onClick={() => deleteUserHandler(user?._id)}
              disabled={isDeleteLoading}
            >
              <i className="fa fa-trash"></i>
            </button>
          </>
        ),
      });
    });

    return users;
  };

  if (isLoading)
    return (
      <AdminLayout>
        <div className="flex justify-center items-center w-full h-[50vh]">
          <SkeletonText />
        </div>
      </AdminLayout>
    );

  return (
    <AdminLayout>
      <Metadata title={"All Users"} />

      <h1 className="my-5">{data?.users?.length} Users</h1>

      <MDBDataTable data={setUsers()} className="px-3" bordered striped hover />
      <Modals isOpen={isModalOpen} onRequestClose={closeModal}>
        <UpdateUser userId={selectedUserId} closeModal={closeModal} />
      </Modals>
    </AdminLayout>
  );
};

export default ListUsers;
