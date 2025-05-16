import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addItem } from "../api"; // Import the addItem function from your API module

function AddItem() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [inputAmount, setInputAmount] = useState("");
  const [inputType, setInputType] = useState("");
  const { cardId, cardName } = JSON.parse(localStorage.getItem("selectedCard"));

  const addPantryItem = async (e) => {
    e.preventDefault();
    console.log("Adding item:", input, inputAmount, inputType, cardId);
    if (!input || !inputAmount || !inputType) {
      alert("Please fill in all fields");
      return;
    }
    try {
      await addItem(input, inputAmount, inputType, cardId);
      alert("Item added successfully");
      localStorage.removeItem("selectedCard");
      navigate("/");
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add item");
    }
  };

  return (
    <div>
      <h1>Add Item to {cardName}</h1>
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
        <select
          value={inputType}
          onChange={(e) => setInputType(e.target.value)}
        >
          <option value="" disabled>
            Select type
          </option>
          <option value="beverage">Beverage</option>
          <option value="bread">Bread</option>
          <option value="cereal">Cereal</option>
          <option value="condiment">Condiment</option>
          <option value="dairy">Dairy</option>
          <option value="dessert">Dessert</option>
          <option value="fruit">Fruit</option>
          <option value="grain">Grain</option>
          <option value="meat">Meat</option>
          <option value="snack">Snack</option>
          <option value="spice">Spice</option>
          <option value="vegetable">Vegetable</option>
        </select>
        <button type="submit">Add Item</button>
      </form>
      <button onClick={() => navigate("/")}>Cancel</button>
    </div>
  );
}

export default AddItem;
