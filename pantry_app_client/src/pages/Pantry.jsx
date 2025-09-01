// description: this file contains the Pantry component, which displays the user's pantry items, allows adding new items, updating quantities, and deleting items. It uses the fetchItems, addItem, updateQuantity, and deleteItem functions from the API module to interact with the backend.
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchItems,
  updateQuantity,
  deleteItem,
  addCard,
  fetchCards,
  deleteCard,
  updateInCart,
} from "../api"; // Import API functions
import "../styles.css"; // Import styles
import { toast } from "react-toastify";

function Pantry() {
  const Navigate = useNavigate();
  const [itemState, setItemState] = useState([]);
  const [searchTermState, setSearchTermState] = useState([]);
  const [cardState, setCardState] = useState([]);
  const [inputCard, setInputCard] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [alert, setAlert] = useState({ message: "", type: "" });

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
        setSearchTermState(items);
      });
    }
  }, [token]);

  // function to add an item to the pantry, it takes the input and inputAmount from the itemState and calls the addItem function from the API
  // then fetches the items again to update the itemState

  const addPantry = async (e) => {
    e.preventDefault();
    if (!inputCard) {
      toast.error("Please enter a pantry name");
      return;
    }
    try {
      await addCard(inputCard);
      const cards = await fetchCards();
      console.log(cards);
      setCardState(cards);
      setInputCard("");
      toast.success("Pantry added successfully!");
    } catch (error) {
      console.error("Error adding card:", error);
      toast.error("Failed to add card");
    }
  };

  // function to update the quantity of an item, it takes the id and change as parameters and calls the updateQuantity function from the API
  // then updates the itemState with the new quantity
  const handleUpdateQuantity = async (id, change) => {
    try {
      await updateQuantity(id, change);
      const items = await fetchItems();
      setItemState(items);
      setSearchTermState(items);
      const zeroQuantityItems = items.filter(
        (item) => item.quantity <= 0 && !item.inCart
      );
      for (const item of zeroQuantityItems) {
        await handleUpdateCart(item.id, item.inCart);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity");
    }
  };

  const handleUpdateCart = async (id, inCart) => {
    try {
      await updateInCart(id, !inCart);
      const items = await fetchItems();
      setItemState(items);
      setSearchTermState(items);
    } catch (error) {
      console.error("Error updating cart:", error);
      toast.error("Failed to update in cart");
    }
  };

  const handleSearchName = (e) => {
    try {
      const searchTerm = e.target.value.toLowerCase();
      if (searchTerm === "") {
        setSearchTermState(itemState);
      } else {
        const foundItems = itemState.filter((item) =>
          item.title.toLowerCase().includes(searchTerm)
        );
        setSearchTermState(foundItems);
      }
    } catch (error) {
      console.error("Error searching items:", error);
      toast.error("Failed to search items by name");
    }
  };

  const handleSearchType = (e) => {
    try {
      const searchType = e.target.value;
      if (searchType === "") {
        setSearchTermState(itemState);
      } else {
        const foundItems = itemState.filter((item) => item.type === searchType);
        setSearchTermState(foundItems);
      }
    } catch (error) {
      toast.error("Failed to search items by type");
      console.error("Error searching items:", error);
    }
  };

  const handleUserItems = (cardId) => {
    const userItems = searchTermState.filter((item) => item.cardId === cardId);
    return userItems.map((item) => (
      <div key={item.id} className="item">
        <h4>{item.title}</h4>
        <p>{item.quantity} </p>
        <p>{item.type} </p>
        <button onClick={() => handleUpdateQuantity(item.id, 1)}>+</button>
        <button
          onClick={() => handleUpdateQuantity(item.id, -1)}
          disabled={item.quantity <= 0}
        >
          -
        </button>
        <button
          onClick={() => deleteItem(item.id, setItemState, setSearchTermState)}
        >
          Delete
        </button>
        <button onClick={() => handleUpdateCart(item.id, item.inCart)}>
          {item.inCart ? "Remove from Cart" : "Add to Cart"}{" "}
        </button>
      </div>
    ));
  };

  // const handleMoveItem = async (itemId, prevCardId, newCardId) => {
  //   try {
  //     await itemState.filter((item) => item.id === itemId.cardId = newCardId;)
  //     const items = await fetchItems();

  //   }
  // }

  const cards = cardState.map((card) => (
    <div key={card.id} className="card">
      <div className="card-header">{card.name}</div>
      <div className="items">{handleUserItems(card.id)}</div>
      <button
        className="card-button"
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
      <button
        className="card-button"
        style={{ textDecoration: "underline" }}
        onClick={async () => {
          await deleteCard(card.id);
          const cards = await fetchCards();
          setCardState(cards);
        }}
      >
        Remove Pantry
      </button>
    </div>
  )) || <p>No cards available</p>;

  return (
    <>
      <form className="form">
        <input placeholder="Search name" onChange={handleSearchName}></input>
        <select onChange={handleSearchType}>
          <option value="">All</option>
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
      </form>
      <form className="form" onSubmit={addPantry}>
        <input
          placeholder="Enter card name"
          value={inputCard}
          onChange={(e) => setInputCard(e.target.value)}
        />
        <button type="submit">Add Card</button>
      </form>
      <div className="cards"> {cards} </div>
    </>
  );
}

export default Pantry;
