import React from "react";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles.css";
import LoginPage from "./pages/LoginPage"; // Import LoginPage component
import RegisterPage from "./pages/RegisterPage"; // Import RegisterPage component
import Pantry from "./pages/Pantry"; // Import Pantry component
import Navbar from "./pages/NavBar";
import AddItem from "./pages/AddItem"; // Import AddItem component
import Cart from "./pages/Cart"; // Import Cart component

function App() {
  const [token, setToken] = useState(localStorage.getItem("token")); // Initialize token state

  return (
    <>
      <BrowserRouter>
        {token && <Navbar setToken={setToken} />}
        <Routes>
          <Route path="/login" element={<LoginPage setToken={setToken} />} />
          <Route path="/register" exact element={<RegisterPage />} />
          <Route
            path="/"
            element={token ? <Pantry /> : <LoginPage setToken={setToken} />}
          />
          <Route
            path="/AddItem"
            element={token ? <AddItem /> : <LoginPage setToken={setToken} />}
          />
          <Route
            path="/Cart"
            element={token ? <Cart /> : <LoginPage setToken={setToken} />}
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </>
  );
}

export default App;
