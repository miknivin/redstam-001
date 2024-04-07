import Footer from "./Components/Layouts/Footer";
import Header from "./Components/Layouts/Header";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import { Component, useEffect, useState } from "react";
import useUserRoutes from "./Components/routes/UserRoutes";
import useAdminRoutes from "./Components/routes/AdminRoutes";
import Modals from "./Components/utilities/Modals";
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const userConfirmed = false
    if (!userConfirmed) {
      const timer = setTimeout(() => {
        setIsModalOpen(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const closeModal = () => {
    // localStorage.setItem("userConfirmed", "true");
    setTimeout(() => {
      setIsModalOpen(false);
    }, 800);
  };
  return (
    <Router>
      <div className="App">
        <Toaster position="top-center" />
        <Header />
        <div className="">
          <ErrorBoundary>
            <Routes>
              {userRoutes}
              {adminRoutes}
            </Routes>
          </ErrorBoundary>
        </div>
        <ConfirmModals isOpen={isModalOpen} onRequestClose={closeModal} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
