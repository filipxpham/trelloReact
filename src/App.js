import "./App.scss";
import "./components/List.js";
import List from "./components/List.js";
import Navbar from "./components/Navbar.js";
import React, { useState } from "react";
import { AiOutlineMore, AiOutlinePlus } from "react-icons/ai";

export default function App(props) {
  const [lists, setLists] = useState([
    {
      name: "myList",
      cards: Array(),
    },
  ]);
  const [listName, setListName] = useState("");
  const [isAddingList, setIsAddingList] = useState(false);

  const handleSubmit = (event) => {
    setLists([...lists, { name: listName, cards: [] }]);
    event.preventDefault();
    setListName("");
    setIsAddingList(false);
  };

  const handleChange = (event) => {
    setListName(event.target.value);
  };

  const handleOnBlurAddList = (event) => {
    if (listName.length > 0) {
      handleSubmit(event);
    } else {
      setIsAddingList(false);
    }
  };

  const changeListAddEditMode = () => {
    setIsAddingList(!isAddingList);
    console.log("edit");
  };

  const handleNameChange = (name, index) => {
    const listsCopy = [...lists];
    listsCopy[index].name = name;
    setLists(listsCopy);
  };

  const renderDefaultAddListView = () => {
    return (
      <div onClick={changeListAddEditMode} className="addListButton">
        <AiOutlinePlus className="marginRight" />
        Přidej další sloupec
      </div>
    );
  };

  const renderAddListView = () => {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <input
            className="input is-focused"
            autoFocus
            onBlur={handleOnBlurAddList}
            type="text"
            name="listName"
            value={listName}
            onChange={handleChange}
            placeholder="Zadej jméno sloupce..."
          />
          <input
            type="submit"
            value="Přidat sloupec"
            className="button is-primary"
          />
        </form>
      </>
    );
  };

  return (
    <div className="bg-image">
      <div className="App">
        <Navbar />
        <div className="columns">
          {lists.map((item, index) => (
            <div className="column">
              <div className="box">
                <List
                  key={item.index}
                  name={item.name}
                  cards={item.cards}
                  handleNameChange={(name) => handleNameChange(name, index)}
                />
              </div>
            </div>
          ))}
          <div className="column">
            <div className="box addListForm-notActive">
              {isAddingList ? renderAddListView() : renderDefaultAddListView()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
