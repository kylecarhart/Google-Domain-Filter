import React from 'react'
import Edit from '../../icons/Edit'
import Clear from '../../icons/Clear'
import Info from '../../icons/Info'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Input from '../input/Input'

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
      <StyledTableEntryInput
        value={inputText}
        onChange={text => setInputText(text)}
        handleEnterKey={() => handleSave(inputText)}
        disabled={isDisabled}
      />
      {!isDisabled && (
        <StyledTableOptions>
          <StyledIcon onClick={() => handleSave(inputText)}>
            <Info size={16} />
          </StyledIcon>
        </StyledTableOptions>
      )}
      {isDisabled && isHovered && (
        <StyledTableOptions>
          <StyledIcon onClick={() => setIsDisabled(false)}>
            <Edit size={16} />
          </StyledIcon>
          <StyledIcon onClick={() => handleDelete()}>
            <Clear size={16} />
          </StyledIcon>
        </StyledTableOptions>
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

const StyledTableOptions = styled.div`
  display: flex;
  align-items: center;

  .icon + .icon {
    margin-left: 8px;
  }
`

const StyledIcon = styled.div`
  cursor: pointer;
  margin-right: 8px;
`

const StyledTableEntryInput = styled(Input)`
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
