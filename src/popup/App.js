/*global chrome*/

import React, { useState } from 'react'
import './App.css'
import Table from './Table'
import AddModal from './AddModal'
import EditModal from './EditModal'
import InfoModal from './InfoModal'
import Info from './icons/Info'
import DomainStorageController, {
  DOMAINS_STORAGE_LOCATION
} from '../DomainStorageController'

function App() {
  const [addModalVisible, setAddModalVisible] = useState(false)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [infoModalVisible, setInfoModalVisible] = useState(false)
  const [entries, setEntries] = React.useState([])
  const [visibleEntries, setVisibleEntries] = React.useState([])
  const [searchInput, setSearchInput] = React.useState('')
  const [selectedEntry, setSelectedEntry] = React.useState(-1)

  const changeListener = change => {
    // Check if entries were changed (and not some other part of storage)
    if (change[DOMAINS_STORAGE_LOCATION]) {
      setEntries(change[DOMAINS_STORAGE_LOCATION].newValue)
    }
  }

  /* 
    On component mount, load the domains from chrome storage.
  */
  React.useEffect(() => {
    DomainStorageController.getDomains().then(domains => {
      setEntries(domains)
      setVisibleEntries(domains)
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
  }, [entries, searchInput])

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
          addEntry={DomainStorageController.addDomain}
        />
      )}
      {editModalVisible && (
        <EditModal
          closeModal={() => setEditModalVisible(false)}
          entryText={entries[selectedEntry]}
          editEntry={text => {
            DomainStorageController.editDomain(selectedEntry, text)
          }}
        />
      )}
      {infoModalVisible && (
        <InfoModal closeModal={() => setInfoModalVisible(false)} />
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
      {entries.length > 0 ? (
        visibleEntries.length > 0 ? (
          <Table
            entries={visibleEntries}
            handleClearClick={DomainStorageController.removeDomain}
            handleEditClick={idx => {
              setEditModalVisible(true)
              setSelectedEntry(idx)
            }}
          />
        ) : (
          <div className="tip tip-warning">No results...</div>
        )
      ) : (
        <div className="tip tip-error">
          Add a domain to your blacklist to start!
        </div>
      )}
      <div className="btn-info" onClick={() => setInfoModalVisible(true)}>
        <Info size={14} />
      </div>
    </div>
  )
}

export default App
