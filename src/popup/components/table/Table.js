import React from 'react'
import TableEntry from './TableEntry'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export default function Table({ entries, handleDelete, handleSave }) {
  return (
    <StyledTable>
      {entries.map((entry, idx) => (
        <TableEntry
          key={entry}
          initialInputText={entry}
          handleDelete={() => handleDelete(entry)}
          handleSave={text => handleSave(idx, text)}
          idx={idx}
        />
      ))}
    </StyledTable>
  )
}

Table.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.string),
  handleDelete: PropTypes.func,
  handleSave: PropTypes.func
}

const StyledTable = styled.ul`
  list-style: none;
  background: #fff;
  font-size: 14px;
  border-radius: 5px;
  overflow: auto;
  padding: 0;
`
