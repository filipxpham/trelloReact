import React, { useState, useRef } from "react";
import Card from "./Card";
import "./List.scss";
import { AiOutlineMore, AiOutlinePlus } from "react-icons/ai";

export default function List(props) {
  const [cards, setCards] = useState(props.cards);
  const [listName, setListName] = useState(props.name);
  const [cardName, setCardName] = useState("");
  const [isEditing, setEditing] = useState(false);

  const handleChange = (event) => {
    setCardName(event.target.value);
  };

  const handleCardNameChange = (event) => {
    setListName(event.target.value);
  };

  const handleSubmit = (event) => {
    setCards([...cards, { name: cardName }]);
    event.preventDefault();
    setCardName("");
  };

  const changeEditMode = () => {
    setListName(props.name);
    setEditing(!isEditing);
    console.log("edit");
  };

  const updateListName = () => {
    setEditing(false);
    props.handleNameChange(listName);
  };

  const handleNameChange = (name, index) => {
    const cardsCopy = [...cards];
    cardsCopy[index].name = name;
    setCards(cardsCopy);
  };

  const renderEditView = () => {
    return (
      <>
        <input
          type="text"
          value={listName}
          name="listName"
          onChange={handleCardNameChange}
        ></input>
        <button onClick={changeEditMode}>X</button>
        <button onClick={updateListName}>OK</button>
      </>
    );
  };

  const renderDefaultView = () => {
    return (
      <>
        <b onDoubleClick={changeEditMode}>{props.name}</b>
      </>
    );
  };

  return (
    <div className="List">
      {isEditing ? renderEditView() : renderDefaultView()}
      <br />
      {cards.map((item, index) => (
        <Card
          key={item.index}
          name={item.name}
          handleNameChange={(name) => handleNameChange(name, index)}
        />
      ))}
      <AiOutlinePlus className="marginRight" />
      Přidat další kartu
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="cardName"
          value={cardName}
          onChange={handleChange}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
