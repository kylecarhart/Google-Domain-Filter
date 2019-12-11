import React, { useState } from 'react'
import './InputWithButton.css'

export default function InputWithButton({
  initialValue = '',
  placeholder = '',
  btnClick,
  btnStyle
}) {
  const [inputValue, setInputValue] = useState(initialValue)

  return (
    <div className="input-with-button">
      <input
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        className="input"
        placeholder="Enter Domains"
      />
      <button
        className="button"
        onClick={() => {
          btnClick(inputValue)
        }}
      >
        Add
      </button>
    </div>
  )
}
