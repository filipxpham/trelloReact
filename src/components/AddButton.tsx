import './AddButton.scss';
import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

interface AddButtonInterface {
  defaultValue: string;
  inputName: string;
  placeholder: string;
  color?: string;
  buttonText: string;
  handleOnBlur: React.FocusEventHandler<HTMLInputElement>;
}

export default function AddButton(props: AddButtonInterface) {
  const [value, setValue] = useState(props.defaultValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event?.target?.value);
  };

  return (
    <>
      <input
        className="input is-focused"
        autoFocus
        onBlur={props.handleOnBlur}
        type="text"
        name={props.inputName}
        value={value}
        onChange={handleChange}
        placeholder={props.placeholder}
      />
      <button type="submit" style={{ backgroundColor: props.color || '#5aac44' }} className="button is-primary">
        {props.buttonText}
      </button>
      <AiOutlineClose />
    </>
  );
}
