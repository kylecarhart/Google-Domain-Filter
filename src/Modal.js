import React from 'react'
import './Modal.css'

export default function Modal({ handleCloseModal }) {
  return (
    <div className="modal-overlay" onClick={handleCloseModal}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">Add Domain</div>
        <div className="modal-subheader">
          Upload a text file of all domains. Supports comma or line separated.
        </div>
        <input className="input" placeholder="example.com" />
        <div className="buttons">
          <button className="cancel" onClick={handleCloseModal}>
            Cancel
          </button>
          <button className="save">Save</button>
        </div>
      </div>
    </div>
  )
}
