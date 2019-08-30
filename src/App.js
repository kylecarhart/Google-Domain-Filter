/*global chrome*/

import React, { useState } from 'react'
import './App.css'
import Table from './Table'
import AddModal from './AddModal'
import EditModal from './EditModal'

const ENTRIES_STORAGE_LOCATION = 'entries'

function App() {
  const [addModalVisible, setAddModalVisible] = useState(false)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [entries, setEntries] = React.useState([])
  const [visibleEntries, setVisibleEntries] = React.useState([])
  const [searchInput, setSearchInput] = React.useState('')

  const changeListener = change => {
    // Check if entries were changed (and not some other part of storage)
    if (change[ENTRIES_STORAGE_LOCATION]) {
      setEntries(change[ENTRIES_STORAGE_LOCATION].newValue)
    }
  }

  /* 
    On component mount, load the domains from chrome storage.
  */
  React.useEffect(() => {
    chrome.storage.sync.get([ENTRIES_STORAGE_LOCATION], function(result) {
      if (result[ENTRIES_STORAGE_LOCATION]) {
        setEntries(result[ENTRIES_STORAGE_LOCATION])
        setVisibleEntries(result[ENTRIES_STORAGE_LOCATION])
      }
    })

    // Listen for chrome storage changes and update UI accordingly
    chrome.storage.onChanged.addListener(changeListener)

    // On cleanup, remove the listener
    return () => {
      chrome.storage.onChanged.removeListener(changeListener)
    }
  }, [])

  /* 
    Whenever the entires change, filter on searchInput 
  */
  React.useEffect(() => {
    setVisibleEntries(entries.filter(entry => entry.includes(searchInput)))
  }, [entries])

  /* 
    Remove entry from chrome storage
  */
  const removeEntry = idx => {
    chrome.storage.sync.set({
      [ENTRIES_STORAGE_LOCATION]: entries.filter((_, _idx) => idx !== _idx)
    })
  }

  /* 
    Add entry to chrome storage
  */
  const addEntry = entryInput => {
    chrome.storage.sync.set({
      [ENTRIES_STORAGE_LOCATION]: [...entries, entryInput]
    })
  }

  /* 
    Update input and filter entries to visibleEntries
  */
  const handleInputChange = inputText => {
    setSearchInput(inputText)
    setVisibleEntries(entries.filter(entry => entry.includes(inputText)))
  }

  return (
    <div className="app">
      {addModalVisible && (
        <AddModal
          closeModal={() => setAddModalVisible(false)}
          addEntry={addEntry}
        />
      )}
      {editModalVisible && (
        <EditModal closeModal={() => setEditModalVisible(false)} />
      )}
      <header className="header">Google Search Blacklist</header>
      <div className="toolbar">
        <input
          value={searchInput}
          onChange={e => handleInputChange(e.target.value)}
          className="searchbar"
          placeholder="Search blacklist..."
        />
        <button className="add-btn" onClick={() => setAddModalVisible(true)}>
          +
        </button>
      </div>
      <Table
        entries={visibleEntries}
        handleClearClick={removeEntry}
        handleEditClick={() => {
          setEditModalVisible(true)
        }}
      />
    </div>
  )
}

export default App
