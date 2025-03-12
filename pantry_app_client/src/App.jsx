import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const HOST = "http://localhost:3000";
  const [state, setState] = useState([]);
  const [input, setInput] = useState("");
  const [inputAmount, setInputAmount] = useState("");

  const fetchItems = async () => {
    const response = await axios.get(`${HOST}/items`);
    const items = response.data.sort((a, b) => a.id - b.id);
    setState(items);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addItem = async () => {
    try {
      await axios.post(`${HOST}/item`, {
        title: input,
        quantity: parseInt(inputAmount) || 1, // Ensure quantity is a number
      });
      await fetchItems(); // Fetch fresh data from the backend
      setInput(""); // Clear input field
      setInputAmount(""); // Clear quantity input
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addItem();
  };

  // need to add quantity adjustment functionality, adding and deducting quantities via toggleItem
  const updateQuantity = async (id, change) => {
    try {
      await axios.put(`${HOST}/item/${id}/quantity`, { change });
      await fetchItems();
    } catch (error) {
      console.error("Error toggling item:", error);
    }
  };

  // need to add item removal functionality via deleteItem
  const deleteItem = async (id) => {
    try {
      await axios.delete(`${HOST}/item/${id}`);
      await fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // need to add mapping functionality to display each item and its quantity with the added function of toggling the quantity
  const items = state.map((item) => {
    return (
      <div key={item.id}>
        {item.title} - Quantity: {item.quantity}
        <button onClick={() => updateQuantity(item.id, 1)}> + </button>
        <button
          onClick={() => updateQuantity(item.id, -1)}
          disabled={item.quantity <= 1}
        >
          {" "}
          -{" "}
        </button>
        <button
          style={{ textDecoration: "underline" }}
          onClick={() => deleteItem(item.id)}
        >
          Remove
        </button>
      </div>
    );
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          placeholder="Enter description"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <input
          placeholder="Enter quantity"
          value={inputAmount}
          onChange={(e) => setInputAmount(e.target.value)}
        />
        <input type="submit" />
      </form>
      {items}
    </>
  );
}

export default App;
