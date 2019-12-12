import React, { useState } from 'react'
import './InputWithButton.css'

export default function InputWithButton({
  initialValue = '',
  placeholder = '',
  btnClick,
  btnStyle
}) {
  const [inputValue, setInputValue] = useState(initialValue)

  const handleKeyDown = e => {
    switch (e.keyCode) {
      case 13:
        btnClick(inputValue)
        setInputValue('')
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
        placeholder="Enter Domains"
        onKeyDown={e => handleKeyDown(e)}
      />
      <button
        className="button"
        onClick={() => {
          btnClick(inputValue)
          setInputValue('')
        }}
      >
        Add
      </button>
    </div>
  )
}
