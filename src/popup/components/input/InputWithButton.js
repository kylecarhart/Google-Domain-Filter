import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Input from '../input/Input'

import { testUrl } from '../../../utils'

export default function InputWithButton({
  initialValue = '',
  placeholder = '',
  btnClick,
  className,
  inputName,
  inputId
}) {
  const [inputValue, setInputValue] = useState(initialValue)
  const isValid = testUrl(inputValue)

  const _btnClick = () => {
    if (isValid && btnClick(inputValue)) {
      setInputValue('')
    }
  }

  return (
    <StyledInputWithButton className={className}>
      <StyledInput
        value={inputValue}
        onChange={value => setInputValue(value)}
        placeholder={placeholder}
        handleEnterKey={() => _btnClick()}
        id={inputId}
        name={inputName}
      />
      <StyledButton onClick={() => _btnClick()}>Add</StyledButton>
    </StyledInputWithButton>
  )
}

InputWithButton.propTypes = {
  initialValue: PropTypes.string,
  placeholder: PropTypes.string,
  btnClick: PropTypes.func,
  className: PropTypes.string,
  inputId: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired
}

const StyledInputWithButton = styled.div`
  display: flex;
  justify-content: stretch;
  align-items: stretch;
`
const StyledInput = styled(Input)`
  font-size: 14px;
  padding: 8px 16px;
  border-radius: 5px 0px 0px 5px;
  outline: none;
  border: none;
`

const StyledButton = styled.button`
  background-color: #4f86f0;
  border-radius: 0px 5px 5px 0px;
  border: none;
  color: white;
  font-weight: 700;
  font-size: 14px;
  flex-grow: 1;

  &:hover {
    cursor: pointer;
    background-color: #3071ed;
  }

  &:focus {
    background-color: #3071ed;
  }

  &:active {
    background-color: #2163e4;
  }
`
