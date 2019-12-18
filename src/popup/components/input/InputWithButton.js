import React, { useState } from 'react'
import './InputWithButton.css'
import PropTypes from 'prop-types'

export default function InputWithButton({
  initialValue = '',
  placeholder = '',
  btnClick,
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

InputWithButton.propTypes = {
  initialValue: PropTypes.string,
  placeholder: PropTypes.string,
  btnClick: PropTypes.func,
  isValid: PropTypes.func
}
