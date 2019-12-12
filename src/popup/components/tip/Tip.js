import React from 'react'
import './Tip.css'

/* 
  @param: style: ok, warning, error
  @param: iconPosition: left, right
  //TODO: finish icon support
*/
export default function Tip({
  text,
  style = 'ok',
  icon,
  iconPosition = 'right'
}) {
  return (
    <div className={`tip tip-${style}`}>
      <span style={{ order: iconPosition === 'right' ? 0 : 1 }}>{text}</span>
      {icon && <span></span>}
    </div>
  )
}
