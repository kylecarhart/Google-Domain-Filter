import React from 'react'
import Modal from './Modal'

export default function InfoModal({ closeModal }) {
  return (
    <Modal header="About" handleCloseModal={closeModal}>
      <div>
        <ul>
          <li>Google Search Blacklist</li>
          <li>Build #: 1.0</li>
          <li>
            <a
              href="https://gitlab.com/KMCGamer/google-search-blacklist"
              target="_blank"
            >
              Gitlab Repository
            </a>
          </li>
          <li>Author: Kyle Carhart</li>
        </ul>
      </div>
      <div className="buttons">
        <button className="save" onClick={closeModal}>
          Close
        </button>
      </div>
    </Modal>
  )
}
