import React from 'react'
import TableEntry from './TableEntry'
import PropTypes from 'prop-types'

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

Table.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.string),
  handleEntryDeleteClick: PropTypes.func,
  handleEntrySaveClick: PropTypes.func
}
