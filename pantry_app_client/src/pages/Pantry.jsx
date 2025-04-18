import React, { useState, useEffect } from "react";
import { fetchItems, addItem, updateQuantity, deleteItem } from "../api"; // Import API functions

function Pantry() {
  const [state, setState] = useState([]);
  const [input, setInput] = useState("");
  const [inputAmount, setInputAmount] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // utilizes the fetchItems function to get the items from the API and set the state when the component mounts
  useEffect(() => {
    if (token) {
      fetchItems().then(setState);
    }
  }, [token]);

  // function to add an item to the pantry, it takes the input and inputAmount from the state and calls the addItem function from the API
  // then fetches the items again to update the state
  const addPantryItem = async (e) => {
    e.preventDefault();
    await addItem(input, inputAmount);
    const items = await fetchItems();
    setState(items);
    setInput("");
    setInputAmount("");
  };

  // function to update the quantity of an item, it takes the id and change as parameters and calls the updateQuantity function from the API
  // then updates the state with the new quantity
  const handleUpdateQuantity = async (id, change) => {
    try {
      await updateQuantity(id, change);
      setState((prevState) =>
        prevState.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + change } : item
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
      alert("Failed to update quantity");
    }
  };

  const items = state.map((item) => (
    <div key={item.id}>
      {item.title} - Quantity: {item.quantity}
      <button onClick={() => handleUpdateQuantity(item.id, 1)}> + </button>
      <button
        onClick={() => handleUpdateQuantity(item.id, -1)}
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

export default Pantry;
