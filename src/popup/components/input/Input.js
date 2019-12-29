import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'

const Input = forwardRef(function Input(
  { value, onChange, handleEnterKey = () => {}, ...props },
  ref
) {
  const _onKeyDown = e => {
    if (e.keyCode === 13) {
      handleEnterKey()
    }
  }

  return (
    <input
      ref={ref}
      value={value}
      onChange={e => onChange(e.target.value)}
      onKeyDown={e => _onKeyDown(e)}
      {...props}
    />
  )
})

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  handleEnterKey: PropTypes.func
}

export default Input
