import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [shoppingList, setShoppingList] = useState([]);
  const [initialLoad, setInitialLoad] = useState(false);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("shoppingList");
    if (data) {
      setShoppingList(JSON.parse(data));
      setInitialLoad(true);
    }
  }, []);

  useEffect(() => {
    if (!initialLoad) {
      return;
    }
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
  }, [shoppingList]);

  const handleAddItem = (e) => {
    e.preventDefault();
    setShoppingList([...shoppingList, newItem]);
    setNewItem("");
  };

  const handleRemoveItem = (itemToDelete) => {
    setShoppingList(shoppingList.filter((item) => item !== itemToDelete));
  };

  return (
    <div className="App">
      <h1>Shopping list</h1>
      <div>
        <form onSubmit={handleAddItem}>
          <input
            name="newItem"
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
          <button type="submit">Add item</button>
        </form>
      </div>
      <ul>
        {shoppingList.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => handleRemoveItem(item)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
