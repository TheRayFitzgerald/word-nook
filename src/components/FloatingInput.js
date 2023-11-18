import { useState, useEffect } from "react";

const FloatingInput = ({ onEnter }) => {
  const [inputValue, setInputValue] = useState("");
  const [placeholder, setPlaceholder] = useState("Enter a word");

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && inputValue.trim()) {
      onEnter(inputValue);
      setInputValue("");
    }
  };

  const handleFocus = () => {
    setPlaceholder("");
  };

  const handleBlur = () => {
    if (!inputValue.trim()) {
      setPlaceholder("Enter a word");
    }
  };

  return (
    <input
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyPress={handleKeyPress}
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholder={placeholder}
      className="w-64 p-3 m-3 mt-4 bg-gray-100 focus:outline-none shadow-md rounded-md text-xl font-serif text-gray-800 text-center"
      style={{ WebkitAppearance: "none" }}
    />
  );
};

export default FloatingInput;