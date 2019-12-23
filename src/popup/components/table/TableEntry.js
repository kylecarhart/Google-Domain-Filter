import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Input from '../input/Input'
import Icon from '../icons'

export default function TableEntry({
  odd = false,
  handleDelete,
  handleSave,
  initialInputText = ''
}) {
  const [isHovered, setHovered] = React.useState(false)
  const [inputText, setInputText] = React.useState(initialInputText)
  const [isDisabled, setIsDisabled] = React.useState(true)

  return (
    //TODO: Fix text overflow
    <StyledTableEntry
      odd={odd}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      isDisabled={isDisabled}
    >
      <StyledInput
        value={inputText}
        onChange={text => setInputText(text)}
        handleEnterKey={() => {
          if (initialInputText === inputText) {
            setIsDisabled(true)
          } else {
            handleSave(inputText)
          }
        }}
        disabled={isDisabled}
      />
      {!isDisabled && (
        <TableOptions>
          <StyledIcon
            name="CircleChecked"
            onClick={() => handleSave(inputText)}
          />
          <StyledIcon
            name="CircleX"
            onClick={() => {
              setInputText(initialInputText)
              setIsDisabled(true)
            }}
          />
        </TableOptions>
      )}
      {isDisabled && isHovered && (
        <TableOptions>
          <StyledIcon
            name="PencilCreate"
            onClick={() => setIsDisabled(false)}
          />
          <StyledIcon name="Trash" onClick={() => handleDelete(inputText)} />
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

const StyledTableEntry = styled.div.attrs(props => ({
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

const StyledIcon = styled(Icon)`
  cursor: pointer;
  margin-right: 8px;
  line-height: 0;
  font-size: 1rem;
`

const StyledInput = styled(Input)`
  font-size: 14px;
  background-color: white;
  border: none;
  border-radius: 5px;
  padding: 1px 8px;

  &:disabled {
    background: none;
    color: #424242;
  }
`
