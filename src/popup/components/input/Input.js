import React from 'react'
import PropTypes from 'prop-types'

export default function Input({
  value,
  onChange,
  handleEnterKey = () => {},
  ...props
}) {
  const _onKeyDown = e => {
    if (e.keyCode === 13) {
      handleEnterKey()
    }
  }

  return (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      onKeyDown={e => _onKeyDown(e)}
      {...props}
    />
  )
}

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  handleEnterKey: PropTypes.func
}
