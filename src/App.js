/*global chrome*/

import React, { useState } from 'react'
import './App.css'
import Table from './Table'
import AddModal from './AddModal'

function App() {
  const [modalVisible, setModalVisible] = useState(false)
  const [entries, setEntries] = React.useState([
    'reddit.com',
    'brickseek.com',
    'w3schools.com',
    'mozilla.com',
    'google.com',
    'anotherone.com',
    'anothertwo.com'
  ])

  const removeEntry = idx => {
    setEntries(entries.filter((_, _idx) => idx !== _idx))
  }

  return (
    <div className="app">
      {modalVisible && (
        <AddModal setModalVisible={setModalVisible} setEntries={setEntries} />
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
