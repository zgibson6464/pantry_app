import axios from "axios";

const HOST = "http://localhost:3000";

// Item functionality

export const fetchItems = async () => {
  const response = await axios.get(`${HOST}/items`);
  return response.data.sort((a, b) => a.id - b.id);
};

export const addItem = async (title, quantity) => {
  await axios.post(`${HOST}/item`, {
    title,
    quantity: parseInt(quantity) || 1,
  });
};

export const updateQuantity = async (id, change) => {
  await axios.put(`${HOST}/item/${id}/quantity`, { change });
};

export const deleteItem = async (id) => {
  await axios.delete(`${HOST}/item/${id}`);
};

// User functionality

export const registerUser = async (username, password) => {
  await axios.post(`${HOST}/user/register`, {
    username,
    email,
    password,
  });
};
