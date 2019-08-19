import React from 'react'

export default function Table({ entries }) {
  return (
    <div className="table">
      {entries.map((entry, idx) =>
        idx % 2 === 0 ? (
          <div className="table-entry">{entry}</div>
        ) : (
          <div className="table-entry table-entry-odd">{entry}</div>
        )
      )}
    </div>
  )
}
