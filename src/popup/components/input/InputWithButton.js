import React, { useState } from 'react'
import './InputWithButton.css'

export default function InputWithButton({
  initialValue = '',
  placeholder = '',
  btnClick,
  btnStyle,
  isValid = () => true
}) {
  const [inputValue, setInputValue] = useState(initialValue)

  const handleKeyDown = e => {
    switch (e.keyCode) {
      case 13:
        if (isValid(inputValue)) {
          btnClick(inputValue)
          setInputValue('')
        }
        break
      default:
        break
    }
  }

  return (
    <div className="input-with-button">
      <input
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        className="input"
        placeholder={placeholder}
        onKeyDown={e => handleKeyDown(e)}
      />
      <button
        className="button"
        onClick={() => {
          if (isValid(inputValue)) {
            btnClick(inputValue)
            setInputValue('')
          }
        }}
      >
        Add
      </button>
    </div>
  )
}
