import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App /> {/* Include your main App component */}
  </StrictMode>
);
