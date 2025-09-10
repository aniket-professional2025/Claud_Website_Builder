import React, { useState } from 'react'
import Display from './Display'
import Keypad from './Keypad'
import History from './History'

const Calculator = () => {
  const [input, setInput] = useState('0')
  const [result, setResult] = useState(null)
  const [history, setHistory] = useState([])
  const [waitingForOperand, setWaitingForOperand] = useState(false)
  const [pendingOperator, setPendingOperator] = useState(null)
  const [storedValue, setStoredValue] = useState(null)

  const clearAll = () => {
    setInput('0')
    setResult(null)
    setWaitingForOperand(false)
    setPendingOperator(null)
    setStoredValue(null)
  }

  const clearHistory = () => {
    setHistory([])
  }

  const clearEntry = () => {
    setInput('0')
  }

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setInput(digit)
      setWaitingForOperand(false)
    } else {
      setInput(input === '0' ? digit : input + digit)
    }
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setInput('0.')
      setWaitingForOperand(false)
    } else if (input.indexOf('.') === -1) {
      setInput(input + '.')
    }
  }

  const inputPercent = () => {
    const currentValue = parseFloat(input)
    if (currentValue === 0) return
    
    const fixedDigits = input.replace(/^-?\d*\.?/, '')
    const newValue = parseFloat(input) / 100
    
    setInput(String(newValue.toFixed(fixedDigits.length + 2)))
  }

  const toggleSign = () => {
    setInput(input.charAt(0) === '-' ? input.substr(1) : '-' + input)
  }

  const performOperation = (operator) => {
    const inputValue = parseFloat(input)
    
    if (storedValue === null) {
      setStoredValue(inputValue)
    } else if (pendingOperator) {
      const newValue = calculate(storedValue, inputValue, pendingOperator)
      setStoredValue(newValue)
      setResult(String(newValue))
    }
    
    setWaitingForOperand(true)
    setPendingOperator(operator)
  }

  const calculate = (firstOperand, secondOperand, operator) => {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand
      case '-':
        return firstOperand - secondOperand
      case '×':
        return firstOperand * secondOperand
      case '÷':
        return secondOperand !== 0 ? firstOperand / secondOperand : 'Error'
      default:
        return secondOperand
    }
  }

  const performCalculation = () => {
    const inputValue = parseFloat(input)
    
    if (pendingOperator && !waitingForOperand) {
      const calculatedValue = calculate(storedValue, inputValue, pendingOperator)
      
      // Add to history
      setHistory([
        ...history,
        {
          calculation: `${storedValue} ${pendingOperator} ${inputValue}`,
          result: calculatedValue
        }
      ])
      
      setInput(String(calculatedValue))
      setResult(String(calculatedValue))
      setStoredValue(null)
      setPendingOperator(null)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <Display input={input} result={result} pendingOperator={pendingOperator} />
        <Keypad 
          onDigitButtonClick={inputDigit}
          onOperatorButtonClick={performOperation}
          onEqualsButtonClick={performCalculation}
          onClearButtonClick={clearAll}
          onClearEntryButtonClick={clearEntry}
          onDecimalButtonClick={inputDecimal}
          onPercentButtonClick={inputPercent}
          onToggleSignButtonClick={toggleSign}
        />
      </div>
      <History history={history} onClearHistory={clearHistory} />
    </div>
  )
}

export default Calculator