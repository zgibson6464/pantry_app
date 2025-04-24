// File: api.js
// Description: This file contains the API functions for user registration, login, and item management in the pantry app connecting the client to the server using axios.
import axios from "axios";

const HOST = "http://localhost:3000";

// Item functionality

export const fetchItems = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${HOST}/items`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.sort((a, b) => a.id - b.id);
};

export const addItem = async (title, quantity, userId) => {
  const token = localStorage.getItem("token");
  await axios.post(
    `${HOST}/items`,
    {
      title,
      quantity: parseInt(quantity) || 1,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const updateQuantity = async (id, change) => {
  const token = localStorage.getItem("token");
  await axios.put(
    `${HOST}/items/${id}/quantity`,
    { change },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const deleteItem = async (id) => {
  const token = localStorage.getItem("token");
  await axios.delete(`${HOST}/items/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// User functionality

export const registerUser = async (username, email, password) => {
  try {
    const response = await axios.post(`${HOST}/user/register`, {
      username,
      email,
      password,
    });
    return response.data.token;
  } catch (error) {
    console.error("Registration error:", error);
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${HOST}/user/login`, {
      email,
      password,
    });
    return response.data.token;
  } catch (error) {
    console.error("Login error:", error);
    alert("Login failed");
  }
};

export const handleLogout = async ({ setToken }) => {
  try {
    localStorage.removeItem("token");
    setToken("");
    alert("Logged out successfully");
  } catch (error) {
    console.error("Error loging out:", error);
    alert("Logout failed");
  }
};
