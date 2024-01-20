import React, { useState } from 'react';

const ColorConverter = () => {
  const [hexColor, setHexColor] = useState('');
  const [rgbColor, setRgbColor] = useState('');
  const [isValidColor, setIsValidColor] = useState(false);

  const convertHexToRgb = (hex) => {
    const isValidHex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);

    if (isValidHex) {
      let color = hex.slice(1);

      if (color.length === 3) {
        color = color
          .split('')
          .map((char) => char + char)
          .join('');
      }

      const red = parseInt(color.slice(0, 2), 16);
      const green = parseInt(color.slice(2, 4), 16);
      const blue = parseInt(color.slice(4, 6), 16);

      return `${red}, ${green}, ${blue}`;
    }

    return null;
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const isValidLength = inputValue.length === 7; // Ввод должен быть длиной 7 символов, включая решетку

    setHexColor(inputValue);

    if (isValidLength) {
      const convertedRgbColor = convertHexToRgb(inputValue);
      if (convertedRgbColor) {
        setIsValidColor(true);
        setRgbColor(convertedRgbColor);
      } else {
        setIsValidColor(false);
        setRgbColor('');
      }
    } else {
      setIsValidColor(false);
      setRgbColor('');
    }
  };

  const containerStyle = {
    backgroundColor: isValidColor ? hexColor : '#ffffff',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div style={containerStyle}>
      <div className="color-converter">
        <input
          type="text"
          value={hexColor}
          onChange={handleInputChange}
          placeholder="Введите HEX-цвет"
          minLength="7"
          maxLength="7"
        />
        <div
          className="color-preview"
          style={{ backgroundColor: hexColor, color: 'white' }}
        >
          {isValidColor ? `RGB: ${rgbColor}` : (hexColor.length === 7 && 'Ошибка')}
        </div>
      </div>
    </div>
  );
};

export default ColorConverter;