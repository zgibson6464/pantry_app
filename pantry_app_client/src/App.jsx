import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./styles.css";
import LoginPage from "./pages/LoginPage"; // Import LoginPage component
import RegisterPage from "./pages/RegisterPage"; // Import RegisterPage component
import Pantry from "./pages/Pantry"; // Import Pantry component
import Navbar from "./pages/NavBar";
import AddItem from "./pages/AddItem"; // Import AddItem component

function App() {
  const [token, setToken] = useState(localStorage.getItem("token")); // Initialize token state

  return (
    <>
      <BrowserRouter>
        <Navbar setToken={setToken} />
        <Routes>
          <Route path="/login" element={<LoginPage setToken={setToken} />} />
          <Route path="/register" exact element={<RegisterPage />} />
          <Route path="/" exact element={<Pantry />} />
          <Route path="/AddItem" element={<AddItem />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
