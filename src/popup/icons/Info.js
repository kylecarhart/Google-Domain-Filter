import React from 'react'
import PropTypes from 'prop-types'

export default function Info({ size = 24, fill = 'black' }) {
  return (
    <div style={{ width: size, height: size }} className="icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
      >
        <path fill="none" d="M0 0h24v24H0V0z" />
        <path
          fill={fill}
          d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
        />
      </svg>
    </div>
  )
}

Info.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string
}
