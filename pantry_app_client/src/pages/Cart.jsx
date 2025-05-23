import { useState, useEffect } from "react";
import { fetchItems, updateQuantity, deleteItem, fetchCarts } from "../api"; // Import API functions
import "../styles.css"; // Import styles

function Cart() {
  const [cartState, setCartState] = useState([]);
  const [searchTermState, setSearchTermState] = useState([]);
  const [itemState, setItemState] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) {
      fetchCarts().then((carts) => {
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

  const handleUserItems = () => {
    const cartItems = searchTermState.filter((item) => item.inCart === true);
    if (cartItems.length === 0) {
      return <p>No items in this cart</p>;
    }
    return cartItems.map((item) => (
      <div key={item.id} className="item">
        <h3>{item.title} - </h3>
        <p>Quantity: {item.quantity} - </p>
        <p>Type: {item.type} </p>
        <button onClick={() => handleUpdateQuantity(item.id, 1)}>+</button>
        <button
          onClick={() => handleUpdateQuantity(item.id, -1)}
          disabled={item.quantity <= 1}
        >
          -
        </button>
        <button onClick={() => deleteItem(item.id)}>Delete</button>
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
