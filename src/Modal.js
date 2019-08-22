import React from 'react'
import './Modal.css'

export default function Modal({
  handleCloseModal,
  header,
  subheader,
  ...props
}) {
  return (
    <div className="modal-overlay" onClick={handleCloseModal}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        {header && <div className="modal-header">{header}</div>}
        {subheader && <div className="modal-subheader">{subheader}</div>}
        {props.children}
      </div>
    </div>
  )
}
