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
          odd={idx % 2 !== 0}
          handleDelete={() => handleDelete(idx)}
          handleSave={text => handleSave(idx, text)}
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

const StyledTable = styled.div`
  background: #fff;
  font-size: 14px;
  border-radius: 5px;
  overflow: auto;
`
