import "./App.scss";
import "./components/List.js";
import List from "./components/List.js";
import Navbar from "./components/Navbar.js";
import React, { useState } from "react";
import { AiOutlineMore, AiOutlinePlus } from "react-icons/ai";
import AddButton from "./components/AddButton";

export default function App(props) {
  const [lists, setLists] = useState([
    {
      name: "myList",
      cards: Array(),
    },
  ]);
  const [isAddingList, setIsAddingList] = useState(false);

  const handleSubmit = (event) => {
    let listName = "";
    if (typeof event == "string") {
      listName = event;
    } else {
      listName = event.target.listName.value;
      event.preventDefault();
    }
    setLists([...lists, { name: listName, cards: [] }]);

    setIsAddingList(false);
  };

  const handleOnBlurAddList = (event) => {
    if (event.target.value) {
      console.log(event.target.value);
      handleSubmit(event.target.value);
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
          <AddButton
            inputName="listName"
            defaultValue={""}
            placeholder="Zadej jméno sloupce..."
            handleOnBlur={handleOnBlurAddList}
            buttonText="Přidat sloupec"
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
