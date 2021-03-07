import "./AddButton.scss";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function AddButton(props) {
  const [value, setValue] = useState(props.defaultValue);

  const handleChange = (event) => {
    setValue(event.target.value);
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
      <button
        type="submit"
        style={{ backgroundColor: props.color || "#5aac44" }}
        className="button is-primary"
      >
        {props.buttonText}
      </button>
      <AiOutlineClose />
    </>
  );
}
