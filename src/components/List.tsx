import React, { useState, useRef } from 'react';
import Card, { CardInterface } from './Card';
import { AiOutlineMore, AiOutlinePlus } from 'react-icons/ai';
import AddButton from './AddButton';
import './List.scss';

export interface ListPropsInterface {
  name: string;
  cards: Array<CardInterface>;
  handleNameChange: (e: string) => void;
}

export default function List(props: ListPropsInterface) {
  const [cards, setCards] = useState<Partial<CardInterface[]>>(props.cards || []);
  const [listName, setListName] = useState(props.name);
  const [cardName, setCardName] = useState('');
  const [isEditing, setEditing] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);

  const handleCardNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListName(e.target.value);
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement> | string) => {
    let cardName = '';
    if (typeof e == 'string') {
      cardName = e;
    } else {
      cardName = e.target['cardName'].value;
      e.preventDefault();
    }
    setCards([...cards, { name: cardName }]);

    setIsAddingCard(false);
  };

  const handleOnBlurAddList = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      console.log(e.target.value);
      handleSubmit(e.target.value);
    } else {
      setIsAddingCard(false);
    }
  };

  const changeEditMode = () => {
    setListName(props.name);
    setEditing(!isEditing);
    console.log('edit');
  };

  const changeCardAddEditMode = () => {
    setIsAddingCard(!isAddingCard);
    console.log('edit');
  };

  const updateListName = () => {
    setEditing(false);
    props.handleNameChange(listName);
  };

  const handleNameChange = (name: string, index: number) => {
    const cardsCopy = [...cards];
    let changedObject = cardsCopy[index];
    if (changedObject) changedObject.name = name;
    setCards(cardsCopy);
  };

  const renderEditView = () => {
    return (
      <>
        <input type="text" value={listName} name="listName" onChange={handleCardNameChange}></input>
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
        <form onSubmit={(e: React.ChangeEvent<HTMLFormElement>): void => handleSubmit(e)}>
          <AddButton
            inputName="cardName"
            defaultValue={''}
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
        {cards.map((item: CardInterface, index: number) => (
          <div className="card">
            <Card key={index} name={item.name} handleNameChange={(name: string) => handleNameChange(name, index)} />
          </div>
        ))}
      </div>
      {isAddingCard ? renderAddCardView() : renderDefaultCardView()}
    </div>
  );
}
