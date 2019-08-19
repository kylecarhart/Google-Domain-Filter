import React from 'react'
import './App.css'
import Table from './Table'

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
  return (
    <div className="app">
      <header className="header">Google Search Blacklist</header>
      <div className="toolbar">
        <input className="searchbar" placeholder="Search blacklist..." />
        <button className="add-btn">+</button>
      </div>
      <Table entries={entries} />
    </div>
  )
}

export default App
