import { useState, useEffect } from "react";
import { fetchItems, addItem, updateQuantity, deleteItem } from "./api"; // Import API functions
import "./App.css";

function App() {
  const [state, setState] = useState([]);
  const [input, setInput] = useState("");
  const [inputAmount, setInputAmount] = useState("");

  useEffect(() => {
    fetchItems().then(setState);
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await addItem(input, inputAmount);
    const items = await fetchItems();
    setState(items);
    setInput("");
    setInputAmount("");
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
