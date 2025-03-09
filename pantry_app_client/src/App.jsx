import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const HOST = "http://localhost:3000";
  const [state, setState] = useState([]);
  const [input, setInput] = useState("");

  const fetchItems = async () => {
    const response = await axios.get(`${HOST}/items`);
    const items = response.data;
    items.sort((a, b) => {
      return a.id - b.id;
    });
    setState(items);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addItem = async () => {
    try {
      await axios.post(`${HOST}/item`, { title: input });
      await fetchItems(); // Fetch fresh data from the backend
      setInput(""); // Clear input field
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addItem();
  };

  // need to add quantity adjustment functionality, adding and deducting quantities via toggleItem

  // need to add item removal functionality via deleteItem
  const deleteItem = async (id) => {
    await axios.delete(`${HOST}/item/${id}`);
    await fetchItems();
  };

  // need to add mapping functionality to display each item and its quantity with the added function of toggling the quantity
  const items = state.map((item) => {
    return (
      <div key={item.id}>
        {item.title}
        {" Quantity: "}
        {item.quantity}
        <button
          style={{ textDecoration: "underline" }}
          onClick={() => deleteItem(item.id)}
        >
          {" "}
          Remove{" "}
        </button>
      </div>
    );
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <input type="submit" />
      </form>
      {items}
    </>
  );
}

export default App;
