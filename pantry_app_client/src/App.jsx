import { useState, useEffect } from "react";
import {
  fetchItems,
  addItem,
  updateQuantity,
  deleteItem,
  registerUser,
  loginUser,
} from "./api"; // Import API functions
import "./styles.css";
import LoginPage from "./pages/LoginPage"; // Import LoginPage component
import RegisterPage from "./pages/RegisterPage"; // Import RegisterPage component

function App() {
  const [state, setState] = useState([]);
  const [input, setInput] = useState("");
  const [inputAmount, setInputAmount] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) {
      fetchItems().then(setState);
    }
  }, [token]);

  const addPantryItem = async (e) => {
    e.preventDefault();
    await addItem(input, inputAmount);
    const items = await fetchItems();
    setState(items);
    setInput("");
    setInputAmount("");
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    setToken(""); // Clear token state
  };

  const items = state.map((item) => (
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
        onClick={async () => {
          await deleteItem(item.id);
          const items = await fetchItems();
          setState(items);
        }}
      >
        Remove
      </button>
    </div>
  ));

  return !token ? (
    <>
      <LoginPage /> // Render login form if not authenticated
      <RegisterPage />
      // Render register form if not authenticated
    </>
  ) : (
    <>
      <form className="form" onSubmit={addPantryItem}>
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
        <button type="submit">Add Item</button>
      </form>
      {items}
    </>
  );
}

export default App;
