import React from 'react'
import TableEntry from './TableEntry'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export default function Table({
  entries,
  handleEntryDeleteClick,
  handleEntrySaveClick
}) {
  return (
    <StyledTable>
      {entries.map((entry, idx) => (
        <TableEntry
          key={entry}
          initialInputText={entry}
          odd={idx % 2 !== 0}
          handleDeleteClick={() => handleEntryDeleteClick(idx)}
          handleSaveClick={text => handleEntrySaveClick(idx, text)}
        />
      ))}
    </StyledTable>
  )
}

Table.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.string),
  handleEntryDeleteClick: PropTypes.func,
  handleEntrySaveClick: PropTypes.func
}

const StyledTable = styled.div`
  background: #fff;
  font-size: 14px;
  border-radius: 5px;
  overflow: auto;
`
