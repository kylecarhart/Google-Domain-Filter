import React from 'react'
import './TableEntry.css'
import Edit from './icons/Edit'
import Clear from './icons/Clear'

export default function TableEntry({
  entry,
  odd = false,
  handleClearClick,
  handleEditClick
}) {
  const [isHovered, setHovered] = React.useState(false)

  return (
    <div
      className={`table-entry ${odd && 'table-entry-odd'}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {entry}
      {isHovered && (
        <div className="table-options">
          <div onClick={() => handleEditClick()}>
            <Edit size={14} />
          </div>
          <div onClick={() => handleClearClick()}>
            <Clear size={14} />
          </div>
        </div>
      )}
    </div>
  )
}
