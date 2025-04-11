import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import NavBar from "./components/NavBar.jsx"; // Import NavBar component
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <NavBar /> {/* Include NavBar component */}
      <App /> {/* Include your main App component */}
    </BrowserRouter>
  </StrictMode>
);
