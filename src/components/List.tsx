import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import AddButton from './AddButton';
import Card, { CardProps } from './Card';

import './List.scss';

interface CardInterface {
	name: string;
}

export interface ListProps {
	name: string;
	cards?: Array<CardProps>;
	handleNameChange?: (e: string) => void;
}

const List: React.FC<ListProps> = (props: ListProps) => {
	const { cards: defaultCards, name: defaultName } = props;

	const [cards, setCards] = useState(defaultCards || []);
	const [listName, setListName] = useState(defaultName);
	const [isEditing, setEditing] = useState(false);
	const [isAddingCard, setIsAddingCard] = useState(false);

	const handleCardNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setListName(e.target.value);
	};

	const handleSubmit = (e: React.ChangeEvent<HTMLFormElement> | string) => {
		let name = '';
		if (typeof e === 'string') {
			name = e;
		} else {
			name = e.target.cardName.value;
			e.preventDefault();
		}
		setCards([...cards, { name }]);

		setIsAddingCard(false);
	};

	const handleOnBlurAddList = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value) {
			handleSubmit(e.target.value);
		} else {
			setIsAddingCard(false);
		}
	};

	const changeEditMode = () => {
		setListName(props.name);
		setEditing(!isEditing);
	};

	const changeCardAddEditMode = () => {
		setIsAddingCard(!isAddingCard);
	};

	const updateListName = () => {
		setEditing(false);
		if (props.handleNameChange) {
			props.handleNameChange(listName);
		}
	};

	const handleNameChange = (name: string, index: number) => {
		const cardsCopy = [...cards];
		const changedObject = cardsCopy[index];
		if (changedObject) {
			changedObject.name = name;
		}
		setCards(cardsCopy);
	};

	const renderEditView = () => {
		return (
			<>
				<input type="text" value={listName} name="listName" onChange={handleCardNameChange} />
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
						defaultValue=""
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
						<Card
							key={index}
							name={item.name}
							handleNameChange={(name: string) => handleNameChange(name, index)}
						/>
					</div>
				))}
			</div>
			{isAddingCard ? renderAddCardView() : renderDefaultCardView()}
		</div>
	);
};

export default List;
