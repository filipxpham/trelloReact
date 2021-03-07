import React, { useState, useRef } from "react";
import Card from "./Card";
import "./List.scss";
import { AiOutlineMore, AiOutlinePlus } from "react-icons/ai";
import AddButton from "./AddButton";

export default function List(props) {
  const [cards, setCards] = useState(props.cards);
  const [listName, setListName] = useState(props.name);
  const [cardName, setCardName] = useState("");
  const [isEditing, setEditing] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);

  const handleCardNameChange = (event) => {
    setListName(event.target.value);
  };

  const handleSubmit = (event) => {
    let cardName = "";
    if (typeof event == "string") {
      cardName = event;
    } else {
      cardName = event.target.cardName.value;
      event.preventDefault();
    }
    setCards([...cards, { name: cardName }]);

    setIsAddingCard(false);
  };

  const handleOnBlurAddList = (event) => {
    if (event.target.value) {
      console.log(event.target.value);
      handleSubmit(event.target.value);
    } else {
      setIsAddingCard(false);
    }
  };

  const changeEditMode = () => {
    setListName(props.name);
    setEditing(!isEditing);
    console.log("edit");
  };

  const changeCardAddEditMode = () => {
    setIsAddingCard(!isAddingCard);
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
        <b className="header" onDoubleClick={changeEditMode}>
          {props.name}
        </b>
      </>
    );
  };

  const renderAddCardView = () => {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <AddButton
            inputName="cardName"
            defaultValue={""}
            placeholder="Zadej název pro tuto kartu..."
            handleOnBlur={handleOnBlurAddList}
            buttonText="Přidat kartu"
          />
        </form>
      </>
    );
  };

  const renderDefaultCardView = () => {
    return (
      <div onClick={changeCardAddEditMode} className="addButton">
        <AiOutlinePlus className="marginRight" />
        Přidat další kartu
      </div>
    );
  };

  return (
    <div className="List">
      {isEditing ? renderEditView() : renderDefaultView()}
      <br />
      <div className="cardList">
        {cards.map((item, index) => (
          <div className="card">
            <Card
              key={item.index}
              name={item.name}
              handleNameChange={(name) => handleNameChange(name, index)}
            />
          </div>
        ))}
      </div>
      {isAddingCard ? renderAddCardView() : renderDefaultCardView()}
    </div>
  );
}
