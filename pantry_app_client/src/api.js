// File: api.js
// Description: This file contains the API functions for user registration, login, and item management in the pantry app connecting the client to the server using axios.
import axios from "axios";
import { toast } from "react-toastify";

const HOST = import.meta.env.VITE_API_URL;

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
    toast.error(error.response.data.error);
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
    toast.error(error.response.data.error);
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
    toast.error(error.response.data.error);
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
        quantity,
        type,
        cardId,
        inCart: Boolean(inCart),
        cartId: cartId ? cartId : null,
        purchaseQuantity: purchaseQuantity || 0,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    console.error("Error adding item:", error);
    toast.error(error.response.data.error);
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
    toast.error(error.response.data.error);
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
    toast.error(error.response.data.error);
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
    toast.error(error.response.data.error);
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
    toast.error(error.response.data.error);
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
    toast.error(error.response.data.error);
  }
};

export const deleteItem = async (id, setItemState, setSearchTermState) => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`${HOST}/items/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const items = await fetchItems();
    setItemState(items);
    setSearchTermState(items);
  } catch (error) {
    console.error("Error deleting item:", error);
    toast.error(error.response.data.error);
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
    toast.error(error.response.data.error);
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
    toast.error(error.response.data.error);
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${HOST}/user/login`, {
      email,
      password,
    });
    if (!response.data.token) {
      throw new Error("Invalid login");
    }
    return response.data.token;
  } catch (error) {
    console.error("Login error:", error);
    toast.error(error.response.data.error);
  }
};

export const handleLogout = async ({ setToken }) => {
  try {
    localStorage.removeItem("token");
    setToken("");
    toast.success("Logged out successfully");
  } catch (error) {
    console.error("Error logging out:", error);
    toast.error(error.response.data.error);
  }
};
