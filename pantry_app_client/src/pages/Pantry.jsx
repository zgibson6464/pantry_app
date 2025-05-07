// description: this file contains the Pantry component, which displays the user's pantry items, allows adding new items, updating quantities, and deleting items. It uses the fetchItems, addItem, updateQuantity, and deleteItem functions from the API module to interact with the backend.
import React, { useState, useEffect } from "react";
import { fetchItems, addItem, updateQuantity, deleteItem } from "../api"; // Import API functions

function Pantry() {
  const [itemState, setItemState] = useState([]);
  const [cardState, setCardState] = useState([]);
  const [input, setInput] = useState("");
  const [inputAmount, setInputAmount] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // utilizes the fetchItems function to get the items from the API and set the itemState when the component mounts
  useEffect(() => {
    if (token) {
      fetchItems().then(setItemState);
    }
  }, [token]);

  // function to add an item to the pantry, it takes the input and inputAmount from the itemState and calls the addItem function from the API
  // then fetches the items again to update the itemState
  const addPantryItem = async (e) => {
    e.preventDefault();
    await addItem(input, inputAmount);
    const items = await fetchItems();
    setItemState(items);
    setInput("");
    setInputAmount("");
  };

  // function to update the quantity of an item, it takes the id and change as parameters and calls the updateQuantity function from the API
  // then updates the itemState with the new quantity
  const handleUpdateQuantity = async (id, change) => {
    try {
      await updateQuantity(id, change);
      setItemState((prevState) =>
        prevState.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + change } : item
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
      alert("Failed to update quantity");
    }
  };

  const cards = itemState.map((card) => (
    <>
      {" "}
      <div key={card.id}>
        {card.name}
        <button
          style={{ textDecoration: "underline" }}
          onClick={async () => {
            await deleteCard(card.id);
            const cards = await fetchCards();
            setCardState(cards);
          }}
        >
          Remove
        </button>
      </div>
      <div> {items} </div>
    </>
  ));

  const items = itemState.map((item) => (
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
          setItemState(items);
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
      {cards}
    </>
  );
}

export default Pantry;
