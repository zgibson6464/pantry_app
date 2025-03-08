import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const HOST = "http://localhost:3000/todos";
  const [state, setState] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios.get(HOST);
      setState(response.data);
    };
    fetchItems();
  }, []);

  const items = state.map((item) => {
    return (
      <div>
        {item.title}
        {" - " + item.quantity}
      </div>
    );
  });
  return <>{items}</>;
}

export default App;
