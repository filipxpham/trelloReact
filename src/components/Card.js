import React, { useState } from "react";
export default function Card(props) {
  const [isEditing, setEditing] = useState(false);
  const [cardName, setCardName] = useState("");

  const handleCardNameChange = (event) => {
    setCardName(event.target.value);
  };

  const changeEditMode = () => {
    setCardName(props.name);
    setEditing(!isEditing);
    console.log("edit");
  };

  const updateCardName = () => {
    setEditing(false);
    props.handleNameChange(cardName);
  };

  const renderEditView = () => {
    return (
      <div>
        <input
          type="text"
          value={cardName}
          name="cardName"
          onChange={handleCardNameChange}
        ></input>
        <button onClick={changeEditMode}>X</button>
        <button onClick={updateCardName}>OK</button>
      </div>
    );
  };

  const renderDefaultView = () => {
    return <div onDoubleClick={changeEditMode}>{props.name}</div>;
  };

  return isEditing ? renderEditView() : renderDefaultView();
}