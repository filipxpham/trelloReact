import "./App.css";
import "./components/List.js";
import List from "./components/List.js";
import React, { useState } from "react";

export default function App(props) {
  const [lists, setLists] = useState([
    {
      name: "myList",
      cards: Array(),
    },
  ]);

  const [listName, setListName] = useState("");

  const handleSubmit = (event) => {
    setLists([...lists, { name: listName, cards: [] }]);
    event.preventDefault();
    setListName("");
  };

  const handleChange = (event) => {
    setListName(event.target.value);
  };

  const handleNameChange = (name, index) => {
    const listsCopy = [...lists];
    listsCopy[index].name = name;
    setLists(listsCopy);
  };

  return (
    <div className="App">
      {lists.map((item, index) => (
        <List
          key={item.index}
          name={item.name}
          cards={item.cards}
          handleNameChange={(name) => handleNameChange(name, index)}
        />
      ))}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="listName"
          value={listName}
          onChange={handleChange}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
