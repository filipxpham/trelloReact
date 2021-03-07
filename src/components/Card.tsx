import React, { useState } from 'react';

export interface CardProps {
	name: string;
	prevState?: null;
	handleNameChange?: (e: string) => void;
}

const Card: React.FC<CardProps> = (props: CardProps) => {
	const [isEditing, setEditing] = useState(false);
	const [cardName, setCardName] = useState('');

	const handleCardNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCardName(event.target.value);
	};

	const changeEditMode = () => {
		setCardName(props.name);
		setEditing(!isEditing);
	};

	const updateCardName = () => {
		setEditing(false);
		if (props.handleNameChange) {
			props.handleNameChange(cardName);
		}
	};

	const renderEditView = () => {
		return (
			<div>
				<input type="text" value={cardName} name="cardName" onChange={handleCardNameChange} />
				<button type="submit" onClick={changeEditMode}>
					X
				</button>
				<button type="button" onClick={updateCardName}>
					OK
				</button>
			</div>
		);
	};

	const renderDefaultView = () => {
		return <div onDoubleClick={changeEditMode}>{props.name}</div>;
	};

	return isEditing ? renderEditView() : renderDefaultView();
};

export default Card;
