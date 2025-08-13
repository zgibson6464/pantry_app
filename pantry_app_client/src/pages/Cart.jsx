import { useState, useEffect } from "react";
import {
  fetchItems,
  addItem,
  updateQuantity,
  fetchCart,
  fetchCards,
  updateInCart,
  updatePurchaseQuantity,
} from "../api"; // Import API functions
import "../styles.css"; // Import styles

function Cart() {
  const [cartState, setCartState] = useState([]);
  const [searchTermState, setSearchTermState] = useState([]);
  const [itemState, setItemState] = useState([]);
  const [cardState, setCardState] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [cardId, setCardId] = useState("");
  const [input, setInput] = useState("");
  const [inputAmount, setInputAmount] = useState("");
  const [inputType, setInputType] = useState("");

  useEffect(() => {
    if (token) {
      fetchCart().then((carts) => {
        setCartState(carts);
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

  useEffect(() => {
    if (token) {
      fetchCards().then((cards) => {
        setCardState(cards);
      });
    }
  }, [token]);

  const addCartItem = async (e, cartId) => {
    e.preventDefault();
    console.log("Adding item:", input, inputAmount, inputType, cardId);
    if (!input || !inputAmount || !inputType || !cardId) {
      alert("Please fill in all fields");
      return;
    }
    try {
      await addItem(input, 0, inputType, cardId, true, cartId, inputAmount);
      setInput("");
      setInputAmount("");
      setInputType("");
      setCardId("");
      alert("Item added successfully!");
      const items = await fetchItems();
      setItemState(items);
      setSearchTermState(items);
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add item");
    }
  };

  const handleUpdatePurchaseQuantity = async (id, purchaseQuantity) => {
    try {
      await updatePurchaseQuantity(id, purchaseQuantity);
      const items = await fetchItems();
      setItemState(items);
      setSearchTermState(items);
    } catch (error) {
      console.error("Error updating quantity change:", error);
      alert("failed to update quantity change");
    }
  };

  const confirmPurchaseQuantity = async (id, purchaseQuantity) => {
    const zeroPurchaseQuantity = -purchaseQuantity;
    try {
      await updateQuantity(id, purchaseQuantity);
      await updatePurchaseQuantity(id, zeroPurchaseQuantity);
      const items = await fetchItems();
      setItemState(items);
      setSearchTermState(items);
    } catch (error) {
      console.error("Error confirming quantity change:", error);
      alert("Failed to confirm quantity change");
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
      alert("Failed to update cart");
    }
  };

  const handleUserItems = () => {
    const cartItems = searchTermState.filter((item) => item.inCart === true);
    return cartItems.map((item) => (
      <div key={item.id} className="item">
        <h3>{item.title} - </h3>
        <p>Current Quantity: {item.quantity} - </p>
        <p>Type: {item.type} </p>
        <p>Purchase Quantity: {item.purchaseQuantity}</p>
        <button onClick={() => handleUpdatePurchaseQuantity(item.id, 1)}>
          +
        </button>
        <button
          onClick={() => handleUpdatePurchaseQuantity(item.id, -1)}
          disabled={item.purchaseQuantity <= 0}
        >
          -
        </button>
        <button
          onClick={() => {
            confirmPurchaseQuantity(item.id, item.purchaseQuantity);
            handleUpdateCart(item.id, item.inCart);
          }}
        >
          Add to Pantry
        </button>
        <button onClick={() => handleUpdateCart(item.id, item.inCart)}>
          Remove from Cart
        </button>
      </div>
    ));
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
      console.error("Error searching items:", error);
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
      alert("Failed to search items");
    }
  };

  const handleAddItem = (cartId) => {
    return (
      <div>
        <h2>Add Item to Cart</h2>
        <form className="form" onSubmit={(e) => addCartItem(e, cartId)}>
          <input
            value={input}
            placeholder="Enter item description"
            onChange={(e) => setInput(e.target.value)}
          />
          <input
            value={inputAmount}
            placeholder="Enter quantity"
            onChange={(e) => setInputAmount(e.target.value)}
          />
          <select
            value={inputType}
            onChange={(e) => setInputType(e.target.value)}
          >
            <option value="" disabled>
              Select Type
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
          <select value={cardId} onChange={(e) => setCardId(e.target.value)}>
            <option value="" disabled>
              Select Pantry
            </option>
            {cardState.map((card) => (
              <option key={card.id} value={card.id}>
                {card.name}
              </option>
            ))}
          </select>
          <button type="submit">Add Item</button>
        </form>
      </div>
    );
  };

  const carts = cartState.map((cart) => (
    <div key={cart.id} className="card">
      <h3>{cart.name}</h3>
      <div className="items">{handleUserItems(cart.id)}</div>
      <div className="add-item">{handleAddItem(cart.id)}</div>
    </div>
  ));

  return (
    <>
      <div>
        <h1> Shopping Cart </h1>
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
        {carts}
      </div>
    </>
  );
}
export default Cart;
