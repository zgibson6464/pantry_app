import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addItem } from "../api"; // Import the addItem function from your API module
import { toast } from "react-toastify";

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
      toast.error("Please fill in all fields");
      return;
    }
    try {
      await addItem(
        input,
        parseInt(inputAmount),
        inputType,
        parseInt(cardId),
        false,
        null,
        0
      );
      toast.success("Item added successfully");
      localStorage.removeItem("selectedCard");
      navigate("/");
    } catch (error) {
      console.error("Error adding item:", error);
      toast.error("Failed to add item");
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
