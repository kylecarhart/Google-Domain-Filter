/*global chrome*/

import React from 'react'
import Modal from './Modal'

import './Input.css'

const URL_REGEX = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/

export default function AddModal({ setModalVisible, addEntry }) {
  const [input, setInput] = React.useState('')
  const [isValid, setValid] = React.useState(false)

  /* 
    On every change, set the text and validate it
  */
  const handleChange = text => {
    setInput(text)
    validateInput(text)
  }

  /* 
    Validate input based on regex
  */
  const validateInput = text => {
    text.match(URL_REGEX) ? setValid(true) : setValid(false)
  }

  return (
    <Modal handleCloseModal={() => setModalVisible(false)} header="Add Domain">
      <input
        className={`input ${
          input.length !== 0 ? (isValid ? 'valid' : 'invalid') : ''
        }`}
        value={input}
        onChange={e => {
          handleChange(e.target.value)
        }}
        placeholder="example.com"
      />
      <div className="buttons">
        <button className="cancel" onClick={() => setModalVisible(false)}>
          Cancel
        </button>
        <button
          className="save"
          onClick={() => {
            if (isValid) {
              addEntry(input)
              setModalVisible(false)
            }
          }}
        >
          Save
        </button>
      </div>
    </Modal>
  )
}
