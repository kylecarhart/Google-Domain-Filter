/*global chrome*/

import React, { useState } from 'react'
import './App.css'
import Table from './Table'
import AddModal from './AddModal'

const ENTRIES_STORAGE_LOCATION = 'entries'

function App() {
  const [modalVisible, setModalVisible] = useState(false)
  const [entries, setEntries] = React.useState([])

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
      setEntries(result[ENTRIES_STORAGE_LOCATION])
    })

    // Listen for chrome storage changes and update UI accordingly
    chrome.storage.onChanged.addListener(changeListener)
  }, [])

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

  return (
    <div className="app">
      {modalVisible && (
        <AddModal setModalVisible={setModalVisible} addEntry={addEntry} />
      )}
      <header className="header">Google Search Blacklist</header>
      <div className="toolbar">
        <input className="searchbar" placeholder="Search blacklist..." />
        <button className="add-btn" onClick={() => setModalVisible(true)}>
          +
        </button>
      </div>
      <Table entries={entries} handleClearClick={removeEntry} />
    </div>
  )
}

export default App
