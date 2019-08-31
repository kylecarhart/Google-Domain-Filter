import React from 'react'
import TableEntry from './TableEntry'

import './Table.css'

export default function Table({ entries, handleClearClick, handleEditClick }) {
  return (
    <div className="table">
      {entries.map((entry, idx) => (
        <TableEntry
          key={idx}
          entry={entry}
          odd={idx % 2 === 0}
          handleClearClick={() => handleClearClick(idx)}
          handleEditClick={() => handleEditClick(idx)}
        />
      ))}
    </div>
  )
}
