import React from 'react'
import './Tip.css'
import PropTypes from 'prop-types'

/* 
  @param: style: ok, warn, error
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
      {icon}
    </div>
  )
}

Tip.propTypes = {
  text: PropTypes.string,
  style: PropTypes.oneOf(['ok', 'warn', 'error']),
  icon: PropTypes.object,
  iconPosition: PropTypes.oneOf(['left', 'right'])
}
