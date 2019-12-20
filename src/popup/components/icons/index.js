import React from 'react'
import PropTypes from 'prop-types'

import SvgAlertTriangle from './AlertTriangle'
import SvgCircleArrowLeft from './CircleArrowLeft'
import SvgCircleChecked from './CircleChecked'
import SvgCircleX from './CircleX'
import SvgGithub from './Github'
import SvgInfo from './Info'
import SvgLinkedIn from './Linkedin'
import SvgMail from './Mail'
import SvgPencilCreate from './PencilCreate'
import SvgTrash from './Trash'
import SvgTwitter from './Twitter'

export default function Icon(props) {
  switch (props.name) {
    case 'AlertTriangle':
      return <SvgAlertTriangle {...props} />
    case 'CircleArrowLeft':
      return <SvgCircleArrowLeft {...props} />
    case 'CircleChecked':
      return <SvgCircleChecked {...props} />
    case 'CircleX':
      return <SvgCircleX {...props} />
    case 'Github':
      return <SvgGithub {...props} />
    case 'Info':
      return <SvgInfo {...props} />
    case 'LinkedIn':
      return <SvgLinkedIn {...props} />
    case 'Mail':
      return <SvgMail {...props} />
    case 'PencilCreate':
      return <SvgPencilCreate {...props} />
    case 'Trash':
      return <SvgTrash {...props} />
    case 'Twitter':
      return <SvgTwitter {...props} />
    default:
      return <div></div>
  }
}

Icon.propTypes = {
  name: PropTypes.string.isRequired
}
