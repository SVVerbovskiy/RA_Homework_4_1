import React, { useState } from 'react';

/**
 * Компонент, отвечающий за отображение элемента выбора цвета
 *
 */
function Converter() {
  const [hex, setHex] = useState('#34495e');

  /**
   * Обновляет состояние при вводе данных в поле ввода
   *
   * @param {object} event Непосредственно, тот объект, с которым происходит взаимодействие (поле ввода).
   */
  const changeColorHandler = (event) => {
    setHex(event.target.value);
  };

  let rgbArr = [];
  let containerStyle = { 
    background: /^#?[A-Fa-f0-9]{6}$/.test(hex) ? hex : '#34495e',
    backgroundColor: /^#?[A-Fa-f0-9]{6}$/.test(hex) ? 'initial' : 'red',
   }

  if (hex.length === 7) {
    if (/^#?[A-Fa-f0-9]{6}$/.test(hex)) {
      const hexCode = hex.split('#')[1];
      for (let i = 0; i < hexCode.length; i += 2) {
        rgbArr.push(parseInt(hexCode[i] + hexCode[i + 1], 16));
      }
      containerStyle = { background: hex };
    }
  }

  let res = 'RGB(' + rgbArr[0] + ', ' + rgbArr[1] + ', ' + rgbArr[2] + ')';

  return (
    <div className="container" style={containerStyle}>
      <div className="wrapper">
        <input
          className="hex"
          id="hex"
          name="hex"
          placeholder="#34495e"
          onChange={changeColorHandler}
          value={hex}
        />
        <div className="rgb" id="rgb">
          {hex.length < 7
            ? 'Ожидаю ввода'
            : /^#?[A-Fa-f0-9]{6}$/.test(hex)
            ? res
            : 'Ошибка!'}
        </div>
      </div>
    </div>
  );
}

export default Converter;