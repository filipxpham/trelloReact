import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import AddButton from './components/AddButton';
import List from './components/List';
import Navbar from './components/Navbar';
import './App.scss';

const App: React.FC = () => {
	const [lists, setLists] = useState([
		{
			name: 'myList',
			cards: [],
		},
	]);
	const [isAddingList, setIsAddingList] = useState(false);

	const handleSubmit = (event: React.ChangeEvent<HTMLFormElement> | string) => {
		let listName = '';
		if (typeof event === 'string') {
			listName = event;
		} else {
			listName = event.target.listName.value;
			event.preventDefault();
		}
		setLists([...lists, { name: listName, cards: [] }]);

		setIsAddingList(false);
	};

	const handleOnBlurAddList = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value) {
			handleSubmit(event.target.value);
		} else {
			setIsAddingList(false);
		}
	};

	const changeListAddEditMode = () => {
		setIsAddingList(!isAddingList);
	};

	const handleNameChange = (name: string, index: number) => {
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
				<form onSubmit={(e: React.ChangeEvent<HTMLFormElement>): void => handleSubmit(e)}>
					<AddButton
						inputName="listName"
						defaultValue=""
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
									key={index}
									name={item.name}
									cards={item.cards}
									handleNameChange={(name: string) => handleNameChange(name, index)}
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
};

export default App;
