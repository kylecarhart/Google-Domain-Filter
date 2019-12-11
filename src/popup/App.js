/*global chrome*/

import React, { useState } from 'react'
import './App.css'
import Table from './components/table/Table'
import DomainStorageController, {
  DOMAINS_STORAGE_LOCATION
} from '../DomainStorageController'
import InputWithButton from './components/input/InputWithButton'
import Tip from './components/tip/Tip'

export default function App() {
  const [entries, setEntries] = useState([])
  const [selectedEntry, setSelectedEntry] = useState(-1)

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
    DomainStorageController.getDomains()
      .then(domains => {
        setEntries(domains)
      })
      .catch(e => {
        console.log(e)
      })

    // Listen for chrome storage changes and update UI accordingly
    chrome.storage.onChanged.addListener(changeListener)

    // On cleanup, remove the listener
    return () => {
      chrome.storage.onChanged.removeListener(changeListener)
    }
  }, [])

  return (
    <div className="app">
      <div className="small-header">Domain</div>
      <div style={{ marginBottom: '16px' }}>
        <InputWithButton
          btnClick={input => {
            setEntries([input, ...entries])
          }}
        />
      </div>
      {entries.length > 0 ? (
        <Table
          entries={entries}
          handleClearClick={DomainStorageController.removeDomain}
          handleEditClick={idx => {
            setEditModalVisible(true)
            setSelectedEntry(idx)
          }}
        />
      ) : (
        <Tip
          text="Enter a domain to start filtering"
          style="warning"
          icon="icon"
        />
      )}
    </div>
  )
}
