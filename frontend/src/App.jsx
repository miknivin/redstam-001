import Home from "./Components/Home";
import Footer from "./Components/Layouts/Footer";
import Header from "./Components/Layouts/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ProductDetails from "./Components/products/ProductDetails";
import "./App.css";
// import Register from "./Components/auth/Register";
import Profile from "./Components/user/Profile";
import PhAuth from "./Components/auth/PhAuth";
import Cart from "./Components/cart/Cart";
import ProtectedRoute from "./Components/auth/ProtectedRoute";
import Shipping from "./Components/cart/Shipping";
import ConfirmOrder from "./Components/cart/ConfirmOrder";
import OrderPlaced from "./Components/cart/OrderPlaced";
import PageNotFound from "./Components/utilities/PageNotFound";
import { Component, useEffect, useState } from "react";
import Contact from "./Components/contactUs/Contact";
import Terms from "./Components/t&c/Terms";
import PrivacyPolicy from "./Components/privacy/PrivacyPolicy";
import Refund from "./Components/t&c/Refund";
import About from "./Components/Layouts/About";
import ShippingPolicy from "./Components/privacy/ShippingPolicy";
import UpdateProfile from "./Components/user/UpdateProfile";
import MyOrders from "./Components/orders/MyOrders";
import OrderDetails from "./Components/orders/OrderDetails";
import Invoice from "./Components/invoices/Invoice";
import Modals from "./Components/utilities/Modals";
import Login from "./Components/auth/login";
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <h1 className="text-4xl p-10">
          Something went wrong. Please try again later.
        </h1>
      );
    }

    return this.props.children;
  }
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const userConfirmed = localStorage.getItem("userConfirmed");
    if (!userConfirmed) {
      const timer = setTimeout(() => {
        setIsModalOpen(true);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, []);

  const closeModal = () => {
    localStorage.setItem("userConfirmed", "true");
    setTimeout(() => {
      setIsModalOpen(false);
    }, 1000);
  };
  return (
    <Router>
      <div className="App">
        <Toaster position="top-center" />
        <Header />
        <div className="">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/login" element={<Login />} />
              {/* <Route path="/register" element={<Register />} /> */}
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
              <Route
                path="/shipping_and_delivery"
                element={<ShippingPolicy />}
              ></Route>
              <Route path="*" element={<PageNotFound />}></Route>
            </Routes>
            <Modals isOpen={isModalOpen} onRequestClose={closeModal} />
          </ErrorBoundary>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
