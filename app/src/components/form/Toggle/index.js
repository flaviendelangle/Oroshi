import React from 'react'

import ToggleOriginal from 'material-ui/Toggle'


const Toggle = props => (
  <ToggleOriginal
    thumbSwitchedStyle={{ background: '#80CBC4' }}
    trackSwitchedStyle={{ background: 'rgb(117, 117, 117)' }}
    {...props}
  />
)

export default Toggle
