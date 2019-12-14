/*global chrome*/

import React, { useState } from 'react'
import Table from './components/table/Table'
import DomainStorageController, {
  DOMAINS_STORAGE_LOCATION
} from '../DomainStorageController'
import InputWithButton from './components/input/InputWithButton'
import Tip from './components/tip/Tip'
import Info from './icons/Info'
import './App.css'

const regex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-zA-Z0-9]+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,5}(:[0-9]{1,5})?(\/.*)?$/

export default function App() {
  const [domains, setDomains] = useState([])
  const [selectedEntry, setSelectedEntry] = useState(-1)

  const changeListener = change => {
    // Check if entries were changed (and not some other part of storage
    if (change[DOMAINS_STORAGE_LOCATION]) {
      setDomains(change[DOMAINS_STORAGE_LOCATION].newValue)
    }
  }

  /* 
    On component mount, load the domains from chrome storage.
  */
  React.useEffect(() => {
    DomainStorageController.getDomains()
      .then(domains => {
        setDomains(domains)
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
          btnClick={input => DomainStorageController.addDomain(input)}
          placeholder="Enter Domains"
          isValid={input =>
            input && regex.test(input) && !domains.includes(input)
          }
        />
      </div>
      <div className="small-header">Filtered Domains</div>
      {domains.length > 0 ? (
        <Table
          entries={domains}
          handleClearClick={DomainStorageController.removeDomain}
          handleEditClick={idx => setSelectedEntry(idx)}
        />
      ) : (
        <Tip
          text="Enter a domain to start filtering"
          style="warning"
          icon={<Info fill="#BB991F"></Info>}
        />
      )}
    </div>
  )
}
