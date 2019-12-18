import React from 'react'
import './TableEntry.css'
import Edit from '../../icons/Edit'
import Clear from '../../icons/Clear'
import Info from '../../icons/Info'
import PropTypes from 'prop-types'

export default function TableEntry({
  odd = false,
  handleDeleteClick,
  handleSaveClick,
  initialInputText = ''
}) {
  const [isHovered, setHovered] = React.useState(false)
  const [inputText, setInputText] = React.useState(initialInputText)
  const [isDisabled, setIsDisabled] = React.useState(true)

  return (
    //TODO: Fix text overflow
    <div
      className={`table-entry ${odd && 'table-entry-odd'}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <input
        className="table-entry-input"
        value={inputText}
        onChange={e => setInputText(e.target.value)}
        disabled={isDisabled}
      />
      {!isDisabled && (
        <div className="table-options">
          <div onClick={() => handleSaveClick(inputText)}>
            <Info size={16} />
          </div>
        </div>
      )}
      {isDisabled && isHovered && (
        <div className="table-options">
          <div onClick={() => setIsDisabled(false)}>
            <Edit size={16} />
          </div>
          <div onClick={() => handleDeleteClick()}>
            <Clear size={16} />
          </div>
        </div>
      )}
    </div>
  )
}

TableEntry.propTypes = {
  odd: PropTypes.bool,
  handleDeleteClick: PropTypes.func,
  handleSaveClick: PropTypes.func,
  initialInputText: PropTypes.string
}
