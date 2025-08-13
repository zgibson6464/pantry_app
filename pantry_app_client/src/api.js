// File: api.js
// Description: This file contains the API functions for user registration, login, and item management in the pantry app connecting the client to the server using axios.
import axios from "axios";

const HOST = "http://localhost:3000";

// Item functionality

export const fetchItems = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${HOST}/items`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.sort((a, b) => a.id - b.id);
  } catch (error) {
    console.error("Error fetching items:", error);
    alert("Failed to fetch items");
  }
};

export const fetchCards = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${HOST}/cards`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.sort((a, b) => a.id - b.id);
  } catch (error) {
    console.error("Error fetching cards:", error);
    alert("Failed to fetch cards");
  }
};

export const fetchCart = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${HOST}/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.sort((a, b) => a.id - b.id);
  } catch (error) {
    console.error("Error fetching cart:", error);
    alert("Failed to fetch cart");
  }
};

export const addItem = async (
  title,
  quantity,
  type,
  cardId,
  inCart,
  cartId,
  purchaseQuantity
) => {
  try {
    const token = localStorage.getItem("token");
    await axios.post(
      `${HOST}/items`,
      {
        title,
        quantity: parseInt(quantity),
        type,
        cardId,
        inCart: Boolean(inCart),
        cartId: cartId ? parseInt(cartId) : null,
        purchaseQuantity: parseInt(purchaseQuantity) || 0,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    console.error("Error adding item:", error);
    alert("Failed to add item");
  }
};

export const addCard = async (name) => {
  try {
    const token = localStorage.getItem("token");
    await axios.post(
      `${HOST}/cards`,
      { name },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    console.error("Error adding card:", error);
    alert("Failed to add Pantry");
  }
};

export const updatePurchaseQuantity = async (id, purchaseQuantity) => {
  try {
    const token = localStorage.getItem("token");
    await axios.put(
      `${HOST}/items/${id}/purchaseQuantity`,
      { purchaseQuantity },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    console.error("Error updating item purchase quantity:", error);
    alert("Failed to update the purchase quantity");
  }
};

export const updateQuantity = async (id, change) => {
  try {
    const token = localStorage.getItem("token");
    await axios.put(
      `${HOST}/items/${id}/quantity`,
      { change },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    console.error("Error updating item quantity:", error);
    alert("Failed to update item quantity");
  }
};

export const updateCard = async (id, cardId) => {
  try {
    const token = localStorage.getItem("token");
    await axios.put(
      `${HOST}/items/${id}/card`,
      { cardId: cardId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    console.error("Error updating Pantry:", error);
    alert("Failed to update Pantry");
  }
};

export const updateInCart = async (id, inCart) => {
  try {
    const token = localStorage.getItem("token");
    await axios.put(
      `${HOST}/items/${id}/inCart`,
      { inCart, id },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error) {
    console.error("Error updating item:", error);
    alert("Failed to update item");
  }
};

export const deleteItem = async (id) => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`${HOST}/items/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("Error deleting item:", error);
    alert("Failed to delete item");
  }
};

export const deleteCard = async (id) => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`${HOST}/cards/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("Error deleting card:", error);
    alert("Failed to delete card");
  }
};

// ================================================================
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
