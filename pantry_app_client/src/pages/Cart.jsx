import { useState, useEffect } from "react";
import {
  fetchItems,
  updateQuantity,
  deleteItem,
  fetchCart,
  updateInCart,
} from "../api"; // Import API functions
import "../styles.css"; // Import styles

function Cart() {
  const [cartState, setCartState] = useState([]);
  const [searchTermState, setSearchTermState] = useState([]);
  const [itemState, setItemState] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [pendingQuantities, setPendingQuantities] = useState({});

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

  const handleUpdateQuantity = async (id, change) => {
    try {
      await updateQuantity(id, change);
      const items = await fetchItems();
      setItemState(items);
      setSearchTermState(items);
    } catch (error) {
      console.error("Error updating quantity:", error);
      alert("Failed to update quantity");
    }
  };

  const handleAddPendingQuantity = async (itemId) => {
    const addValue = parseInt(pendingQuantities[itemId]) || 0;
    if (addValue > 0) {
      await handleUpdateQuantity(itemId, addValue);
      setPendingQuantities((prev) => ({ ...prev, [itemId]: "" }));
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
    const handlePendingQuantityChange = (itemId, value) => {
      setPendingQuantities((prev) => ({
        ...prev,
        [itemId]: value,
      }));
    };

    const cartItems = searchTermState.filter((item) => item.inCart === true);
    if (cartItems.length === 0) {
      return <p>No items in this cart</p>;
    }
    return cartItems.map((item) => (
      <div key={item.id} className="item">
        <h3>{item.title} - </h3>
        <p>Current Quantity: {item.quantity} - </p>
        <p>Type: {item.type} </p>
        <input
          type="number"
          min="0"
          value={pendingQuantities[item.id] || ""}
          onChange={(e) => handlePendingQuantityChange(item.id, e.target.value)}
          placeholder="Add Quantity"
        />
        <button
          onClick={() => {
            handleAddPendingQuantity(item.id);
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

  const carts = cartState.map((cart) => (
    <div key={cart.id} className="card">
      <h3>{cart.name}</h3>
      <div className="items">{handleUserItems(cart.id)}</div>
    </div>
  ));

  return (
    <>
      <div>
        <h1> Shopping Cart </h1>
        {carts}
      </div>
    </>
  );
}
export default Cart;
