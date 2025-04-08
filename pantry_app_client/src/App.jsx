import { useState, useEffect } from "react";
import {
  fetchItems,
  addItem,
  updateQuantity,
  deleteItem,
  registerUser,
  loginUser,
} from "./api"; // Import API functions
import "./App.css";

function App() {
  const [state, setState] = useState([]);
  const [input, setInput] = useState("");
  const [inputAmount, setInputAmount] = useState("");
  const [registerUsername, setRegisterUsername] = useState(""); //For register form
  const [registerEmail, setRegisterEmail] = useState(""); //For register form
  const [loginEmail, setLoginEmail] = useState(""); //For login form
  const [registerPassword, setRegisterPassword] = useState(""); //For register form
  const [loginPassword, setLoginPassword] = useState(""); //For login form
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) {
      fetchItems().then(setState);
    }
  }, [token]);

  const addPantryItem = async (e) => {
    e.preventDefault();
    await addItem(input, inputAmount);
    const items = await fetchItems();
    setState(items);
    setInput("");
    setInputAmount("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser(registerUsername, registerEmail, registerPassword);
      const token = await loginUser(registerEmail, registerPassword);
      localStorage.setItem("token", token);
      setToken(token);
      alert("User registered successfully! Redirecting to Pantry...");
      setRegisterUsername("");
      setRegisterEmail("");
      setRegisterPassword("");
    } catch (error) {
      alert("Registration failed");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const token = await loginUser(loginEmail, loginPassword);
      localStorage.setItem("token", token);
      setToken(token);
      alert("Login successful!");
      setLoginEmail("");
      setLoginPassword("");
    } catch (error) {
      alert("Login failed");
    }
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
      {!token ? (
        <>
          <form className="form" onSubmit={handleRegister}>
            <h2>Register</h2>
            <input
              placeholder="Username"
              value={registerUsername}
              onChange={(e) => setRegisterUsername(e.target.value)}
            />
            <input
              placeholder="Email"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
            />
            <button type="submit">Register</button>
          </form>

          <form className="form" onSubmit={handleLogin}>
            <h2>Login</h2>
            <input
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
        </>
      ) : (
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
      )}
    </>
  );
}

export default App;
