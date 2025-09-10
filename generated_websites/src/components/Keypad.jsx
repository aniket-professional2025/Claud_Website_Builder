import React from 'react'

const Keypad = ({
  onDigitButtonClick,
  onOperatorButtonClick,
  onEqualsButtonClick,
  onClearButtonClick,
  onClearEntryButtonClick,
  onDecimalButtonClick,
  onPercentButtonClick,
  onToggleSignButtonClick
}) => {
  return (
    <div className="grid grid-cols-4 gap-3 p-4 bg-gray-50">
      <button onClick={onClearButtonClick} className="clear-button">AC</button>
      <button onClick={onClearEntryButtonClick} className="function-button">CE</button>
      <button onClick={onPercentButtonClick} className="function-button">%</button>
      <button onClick={() => onOperatorButtonClick('÷')} className="operator-button">÷</button>

      <button onClick={() => onDigitButtonClick('7')} className="number-button">7</button>
      <button onClick={() => onDigitButtonClick('8')} className="number-button">8</button>
      <button onClick={() => onDigitButtonClick('9')} className="number-button">9</button>
      <button onClick={() => onOperatorButtonClick('×')} className="operator-button">×</button>

      <button onClick={() => onDigitButtonClick('4')} className="number-button">4</button>
      <button onClick={() => onDigitButtonClick('5')} className="number-button">5</button>
      <button onClick={() => onDigitButtonClick('6')} className="number-button">6</button>
      <button onClick={() => onOperatorButtonClick('-')} className="operator-button">-</button>

      <button onClick={() => onDigitButtonClick('1')} className="number-button">1</button>
      <button onClick={() => onDigitButtonClick('2')} className="number-button">2</button>
      <button onClick={() => onDigitButtonClick('3')} className="number-button">3</button>
      <button onClick={() => onOperatorButtonClick('+')} className="operator-button">+</button>

      <button onClick={onToggleSignButtonClick} className="number-button">±</button>
      <button onClick={() => onDigitButtonClick('0')} className="number-button">0</button>
      <button onClick={onDecimalButtonClick} className="number-button">.</button>
      <button onClick={onEqualsButtonClick} className="equals-button">=</button>
    </div>
  )
}

export default Keypad