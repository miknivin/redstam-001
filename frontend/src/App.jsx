import Footer from "./Components/Layouts/Footer";
import Header from "./Components/Layouts/Header";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./App.css";
import { Component, useEffect, useState } from "react";
import useUserRoutes from "./Components/routes/UserRoutes";
import useAdminRoutes from "./Components/routes/AdminRoutes";
import HeaderRe from "./Components/Layouts/HeaderRe";
import ScrollToTopButton from "./Components/utilities/ScrollToTopButton";
import ConfirmModals from "./Components/utilities/ConfirmModal";
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
  const userRoutes = useUserRoutes();
  const adminRoutes = useAdminRoutes();
  return (
    <Router>
      <div className="App">
        <Toaster position="top-center" />
        <HeaderRe />
        <div className="">
          <ErrorBoundary>
            <Routes>
              {userRoutes}
              {adminRoutes}
            </Routes>
          </ErrorBoundary>
        </div>
        <ScrollToTopButton />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
