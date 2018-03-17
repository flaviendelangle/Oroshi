import React from 'react'

import ToggleOriginal from 'material-ui/Toggle'

const THUMB_STYLE = { background: '#80CBC4' }
const TRACK_STYLE = { background: 'rgb(117, 117, 117)' }


const Toggle = props => (
  <ToggleOriginal
    thumbSwitchedStyle={THUMB_STYLE}
    trackSwitchedStyle={TRACK_STYLE}
    {...props}
  />
)

export default Toggle
