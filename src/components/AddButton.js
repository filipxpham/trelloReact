import "./AddButton.scss";
import React, { useState } from "react";

export default function AddButton(props) {
  const [type, setType] = useState(null);
  const [value, setValue] = useState(null);

  return <input type={type} value={value} className="button is-primary" />;
}
