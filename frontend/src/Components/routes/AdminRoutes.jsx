import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";
import ListProducts from "../admin/ListProducts";
import NewProduct from "../admin/NewProduct";
import ListOrders from "../admin/ListOrders";

const AdminRoutes = () => {
  return (
    <>
      <Route
        path="/admin/products"
        element={
          <ProtectedRoute admin={true}>
            <ListProducts />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/add_products"
        element={
          <ProtectedRoute admin={true}>
            <NewProduct />
          </ProtectedRoute>
        }
      />
       <Route
        path="/admin/orders"
        element={
          <ProtectedRoute admin={true}>
            <ListOrders />
          </ProtectedRoute>
        }
      />
    </>
  );
};

export default AdminRoutes;
