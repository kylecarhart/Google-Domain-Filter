import React, { useState } from 'react'

export default function DomainInput() {
  const [inputValue, setInputValue] = useState('')

  return (
    <>
      <input
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        className="searchbar"
        placeholder="Enter Domains"
      />
      <button className="add-btn" onClick={() => {}}>
        Add
      </button>
    </>
  )
}
