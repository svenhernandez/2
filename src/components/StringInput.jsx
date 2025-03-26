import React, { useState } from "react";

const StringInput = ({ onEvaluate }) => {
  const [inputString, setInputString] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onEvaluate(inputString);
    setInputString("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Cadena a evaluar:</label>
        <input
          type="text"
          value={inputString}
          onChange={(e) => setInputString(e.target.value)}
        />
      </div>
      <button type="submit">Evaluar</button>
    </form>
  );
};

export default StringInput;