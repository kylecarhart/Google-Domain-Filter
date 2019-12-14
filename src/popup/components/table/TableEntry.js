import React from 'react'
import './TableEntry.css'
import Edit from '../../icons/Edit'
import Clear from '../../icons/Clear'

export default function TableEntry({
  odd = false,
  handleClearClick,
  handleEditClick,
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
      {isHovered && (
        <div className="table-options">
          <div onClick={() => handleEditClick()}>
            <Edit size={16} />
          </div>
          <div onClick={() => handleClearClick()}>
            <Clear size={16} />
          </div>
        </div>
      )}
    </div>
  )
}
