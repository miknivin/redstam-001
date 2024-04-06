import React from "react";
import { Route } from "react-router-dom";
import Home from "../Home";
import Contact from "../contactUs/Contact";
import Terms from "../t&c/Terms";
import PrivacyPolicy from "../privacy/PrivacyPolicy";
import Refund from "../t&c/Refund";
import About from "../Layouts/About";
import ShippingPolicy from "../privacy/ShippingPolicy";
import UpdateProfile from "../user/UpdateProfile";
import MyOrders from "../orders/MyOrders";
import OrderDetails from "../orders/OrderDetails";
import Invoice from "../invoices/Invoice";
import Login from "../auth/login";
import Register from "../auth/Register";
import Profile from "../user/Profile";
// import PhAuth from "./Components/auth/PhAuth";
import Cart from "../cart/Cart";
import ProtectedRoute from "../auth/ProtectedRoute";
import Shipping from "../cart/Shipping";
import ConfirmOrder from "../cart/ConfirmOrder";
import OrderPlaced from "../cart/OrderPlaced";
import PageNotFound from "../utilities/PageNotFound";
import ProductDetails from "../products/ProductDetails";
import ForgotPassword from "../auth/ForgotPassword";
import ResetPassword from "../auth/ResetPassword";
const UserRoutes = () => {
  return (
    <>
      <Route path="/" element={<Home />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/password/forgot" element={<ForgotPassword />} />
      <Route path="/password/reset/:token" element={<ResetPassword />} />
      <Route
        path="/me/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route path="/me/update_profile" element={<UpdateProfile />} />
      <Route path="/cart" element={<Cart />} />
      <Route
        path="/shipping"
        element={
          <ProtectedRoute>
            <Shipping />
          </ProtectedRoute>
        }
      />
      <Route
        path="/confirm_order"
        element={
          <ProtectedRoute>
            <ConfirmOrder />
          </ProtectedRoute>
        }
      />
      <Route
        path="/order_placed"
        element={
          <ProtectedRoute>
            <OrderPlaced />
          </ProtectedRoute>
        }
      />
      <Route
        path="/me/orders"
        element={
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/me/order/:id"
        element={
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/invoice/order/:id"
        element={
          <ProtectedRoute>
            <Invoice />
          </ProtectedRoute>
        }
      />
      <Route path="/about" element={<About />}></Route>
      <Route path="/contact" element={<Contact />}></Route>
      <Route path="/terms_and_conditions" element={<Terms />}></Route>
      <Route path="/privacy_policy" element={<PrivacyPolicy />}></Route>
      <Route path="/return_and_refund" element={<Refund />}></Route>
      <Route path="/shipping_and_delivery" element={<ShippingPolicy />}></Route>
      <Route path="*" element={<PageNotFound />}></Route>
    </>
  );
};

export default UserRoutes;
