// description: this file contains the Pantry component, which displays the user's pantry items, allows adding new items, updating quantities, and deleting items. It uses the fetchItems, addItem, updateQuantity, and deleteItem functions from the API module to interact with the backend.
import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchItems,
  updateQuantity,
  deleteItem,
  addCard,
  fetchCards,
  deleteCard,
} from "../api"; // Import API functions
import "../styles.css"; // Import styles

function Pantry() {
  const Navigate = useNavigate();
  const [itemState, setItemState] = useState([]);
  const [cardState, setCardState] = useState([]);
  const [inputCard, setInputCard] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // utilizes the fetchItems function to get the items from the API and set the itemState when the component mounts

  useEffect(() => {
    if (token) {
      fetchCards().then((cards) => {
        setCardState(cards);
      });
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchItems().then((items) => {
        setItemState(items);
      });
    }
  }, [token]);

  // function to add an item to the pantry, it takes the input and inputAmount from the itemState and calls the addItem function from the API
  // then fetches the items again to update the itemState

  const addPantry = async (e) => {
    e.preventDefault();
    try {
      await addCard(inputCard);
      const cards = await fetchCards();
      console.log(cards);
      setCardState(cards);
      setInputCard("");
    } catch (error) {
      console.error("Error adding card:", error);
      alert("Failed to add card");
    }
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

  const HandleFilteredItems = (cardId) => {
    const filteredItems = itemState.filter((item) => item.cardId === cardId);
    return filteredItems.map((item) => (
      <ul key={item.id}>
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
      </ul>
    ));
  };

  const cards = cardState.map((card) => (
    <div key={card.id} className="card">
      <div>
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
      <button
        onClick={() =>
          Navigate(
            "/AddItem",
            localStorage.setItem(
              "selectedCard",
              JSON.stringify({ cardId: card.id, cardName: card.name })
            )
          )
        }
      >
        Add Item
      </button>
      <div>{HandleFilteredItems(card.id)}</div>
    </div>
  )) || <p>No cards available</p>;

  return (
    <>
      <form className="form" onSubmit={addPantry}>
        <input
          placeholder="Enter card name"
          value={inputCard}
          onChange={(e) => setInputCard(e.target.value)}
        />
        <button type="submit">Add Card</button>
      </form>
      <div className="card-container"> {cards} </div>
    </>
  );
}

export default Pantry;
