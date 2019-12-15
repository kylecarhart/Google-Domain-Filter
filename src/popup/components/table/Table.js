import React from 'react'
import TableEntry from './TableEntry'

import './Table.css'

export default function Table({
  entries,
  handleEntryDeleteClick,
  handleEntrySaveClick
}) {
  return (
    <div className="table">
      {entries.map((entry, idx) => (
        <TableEntry
          key={entry}
          initialInputText={entry}
          odd={idx % 2 !== 0}
          handleDeleteClick={() => handleEntryDeleteClick(idx)}
          handleSaveClick={text => handleEntrySaveClick(idx, text)}
        />
      ))}
    </div>
  )
}
