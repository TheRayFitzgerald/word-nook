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
      placeholder='here'
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyPress={handleKeyPress}
      autoFocus
      className="mt-12 w-64 p-2 bg-transparent focus:outline-none text-center"
    />
  );
};

export default FloatingInput;
