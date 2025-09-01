import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
// import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import App from "./App.jsx";
import { ToastContainer, Bounce } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App /> {/* Include your main App component */}
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition={Bounce}
    />
  </StrictMode>
);
