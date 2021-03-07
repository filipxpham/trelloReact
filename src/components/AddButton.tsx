import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import './AddButton.scss';

interface AddButtonProps {
	defaultValue: string;
	inputName: string;
	placeholder: string;
	color?: string;
	buttonText: string;
	handleOnBlur: React.FocusEventHandler<HTMLInputElement>;
}

const AddButton: React.FunctionComponent<AddButtonProps> = ({
	handleOnBlur,
	inputName,
	placeholder,
	color = 'green',
	defaultValue,
	buttonText,
}) => {
	const [value, setValue] = useState(defaultValue);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event?.target?.value);
	};
	return (
		<>
			<input
				className="input is-focused"
				autoFocus
				onBlur={handleOnBlur}
				type="text"
				name={inputName}
				value={value}
				onChange={handleChange}
				placeholder={placeholder}
			/>
			<button
				type="submit"
				style={{ backgroundColor: color || '#5aac44' }}
				className="button is-primary"
			>
				{buttonText}
			</button>
			<AiOutlineClose />
		</>
	);
};

export default AddButton;
