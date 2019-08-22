import React, { useState } from 'react'
import './App.css'
import Table from './Table'
import Modal from './Modal'

function App() {
  const [modalVisible, setModalVisible] = useState(false)
  const [input, setInput] = React.useState('')
  const [entries, setEntries] = React.useState([
    'reddit.com',
    'brickseek.com',
    'w3schools.com',
    'mozilla.com',
    'google.com',
    'anotherone.com',
    'anothertwo.com'
  ])

  const showModal = () => {
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  const removeEntry = idx => {
    setEntries(entries.filter((entry, _idx) => idx !== _idx))
  }

  return (
    <div className="app">
      {modalVisible && (
        <Modal
          handleCloseModal={() => closeModal()}
          header="Add Domain"
          subheader="Upload a text file of all domains. Supports comma or line separated."
        >
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            className="input"
            placeholder="example.com"
          />
          <div className="buttons">
            <button className="cancel" onClick={() => closeModal()}>
              Cancel
            </button>
            <button
              className="save"
              onClick={() => {
                setEntries(old => [...old, input])
                closeModal()
              }}
            >
              Save
            </button>
          </div>
        </Modal>
      )}
      <header className="header">Google Search Blacklist</header>
      <div className="toolbar">
        <input className="searchbar" placeholder="Search blacklist..." />
        <button className="add-btn" onClick={showModal}>
          +
        </button>
      </div>
      <Table entries={entries} handleClearClick={removeEntry} />
    </div>
  )
}

export default App
