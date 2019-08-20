import React, { useState } from 'react'
import './App.css'
import Table from './Table'
import Modal from './Modal'

const entries = [
  'reddit.com',
  'brickseek.com',
  'w3schools.com',
  'mozilla.com',
  'google.com',
  'anotherone.com',
  'anothertwo.com'
]

function App() {
  const [modalVisible, setModalVisible] = useState(false)

  const showModal = () => {
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  return (
    <div className="app">
      {modalVisible && <Modal handleCloseModal={closeModal} />}
      <header className="header">Google Search Blacklist</header>
      <div className="toolbar">
        <input className="searchbar" placeholder="Search blacklist..." />
        <button className="add-btn" onClick={showModal}>
          +
        </button>
      </div>
      <Table entries={entries} />
    </div>
  )
}

export default App
