import { useState } from 'react';

const FloatingInput = ({ onEnter }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && inputValue.trim()) {
      onEnter(inputValue);
      setInputValue('');
    }
  };

  return (
    <input
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyPress={handleKeyPress}
      autoFocus
      className="w-64 p-3 m-3 mt-8 bg-gray-100 focus:outline-none shadow-lg rounded-md text-xl font-serif text-gray-800 text-center"
    />
  );
};

export default FloatingInput;
