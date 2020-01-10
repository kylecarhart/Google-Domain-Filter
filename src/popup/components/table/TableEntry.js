import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Input from '../input/Input'
import Icon from '../icons'
import { testUrl } from '../../../utils'
import useOutsideClickHandler from '../../hooks/useOutsideClickHandler'

export default function TableEntry({
  handleDelete,
  handleSave,
  initialInputText = '',
  idx
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [inputText, setInputText] = useState(initialInputText)
  const [isDisabled, setIsDisabled] = useState(true)
  const tableEntryRef = useRef()
  const inputRef = useRef()
  useOutsideClickHandler(tableEntryRef, isDisabled, resetInput)
  const isValid = testUrl(inputText)

  function resetInput() {
    setInputText(initialInputText)
    setIsDisabled(true)
  }

  function _handleSave() {
    if (initialInputText === inputText) {
      setIsDisabled(true)
    } else if (isValid) {
      handleSave(inputText)
    }
  }

  function handleBlur() {
    setTimeout(() => {
      if (!tableEntryRef.current.contains(document.activeElement)) {
        setIsFocused(false)
      }
    }, 0)
  }

  return (
    <StyledTableEntry
      ref={tableEntryRef}
      odd={idx % 2 !== 0}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => handleBlur()}
      isDisabled={isDisabled}
      tabIndex="0"
      onMouseDown={e => e.preventDefault()}
    >
      {isDisabled ? (
        <InputDiv
          onDoubleClick={() => {
            setIsDisabled(false)
            setTimeout(() => {
              inputRef.current.focus()
            }, 0)
          }}
        >
          {inputText}
        </InputDiv>
      ) : (
        <>
          <InvisibleAriaElement as="label" htmlFor={`domainInput${idx}`}>
            Domain Edit Input
          </InvisibleAriaElement>
          <StyledInput
            ref={inputRef}
            value={inputText}
            onChange={text => setInputText(text)}
            handleEnterKey={() => _handleSave()}
            id={`domainInput${idx}`}
            name={`domainInput${idx}`}
          />
          <TableOptions>
            <ButtonIcon
              onClick={() => _handleSave()}
              aria-label="Save changes to domain"
            >
              <Icon name="CircleChecked" />
            </ButtonIcon>
            <ButtonIcon
              onClick={() => {
                resetInput()
              }}
              aria-label="Discard changes to domain"
            >
              <Icon name="CircleX" />
            </ButtonIcon>
          </TableOptions>
        </>
      )}
      {isDisabled && (isHovered || isFocused) && (
        <TableOptions>
          <ButtonIcon
            onClick={() => {
              setIsDisabled(false)
              setTimeout(() => {
                inputRef.current.focus()
              }, 0)
            }}
            onBlur={() => handleBlur()}
            aria-label="Edit domain"
          >
            <Icon name="PencilCreate" />
          </ButtonIcon>
          <ButtonIcon
            onClick={() => handleDelete(inputText)}
            onBlur={() => handleBlur()}
            aria-label="Delete domain"
          >
            <Icon name="Trash" />
          </ButtonIcon>
        </TableOptions>
      )}
    </StyledTableEntry>
  )
}

TableEntry.propTypes = {
  odd: PropTypes.bool,
  handleDelete: PropTypes.func,
  handleSave: PropTypes.func,
  initialInputText: PropTypes.string
}

const StyledTableEntry = styled.li.attrs(props => ({
  background: props.odd ? '#f8f8f8' : '#ffffff'
}))`
  padding: 8px 8px;
  display: flex;
  justify-content: space-between;
  color: #424242;
  background: ${props => (!props.isDisabled ? '#ebebeb' : props.background)};

  &:hover {
    background: #ebebeb;
    color: #4a4a4a;
  }
`

const TableOptions = styled.div`
  display: flex;
  align-items: center;

  .icon + .icon {
    margin-left: 8px;
  }
`

const ButtonIcon = styled.button`
  background: none;
  border: none;
  line-height: 0;
  margin-right: 8px;
  cursor: pointer;
  font-size: 1rem;
  color: inherit;
  padding: 0;
`

const StyledInput = styled(Input)`
  font-size: 14px;
  background-color: white;
  border: none;
  border-radius: 5px;
  padding: 1px 8px;
`

const InputDiv = styled.div`
  font-size: 14px;
  border: none;
  border-radius: 5px;
  padding: 1px 8px;
  user-select: none;
  width: 230px;
  text-overflow: ellipsis;
  overflow: hidden;
`

const InvisibleAriaElement = styled.div`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`
