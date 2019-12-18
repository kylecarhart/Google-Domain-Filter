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
    if (e.keyCode === 13) {
      validateAndSubmit()
    }
  }

  const validateAndSubmit = () => {
    if (isValid(inputValue)) {
      btnClick(inputValue)
      setInputValue('')
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
      <button className="button" onClick={validateAndSubmit}>
        Add
      </button>
    </div>
  )
}
