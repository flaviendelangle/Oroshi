import React from 'react'
import PropTypes from 'prop-types'

import muiThemeable from 'material-ui/styles/muiThemeable'

import * as _style from './style'

const NotFound = ({ muiTheme: palette }) => (
  <div style={_style.container(palette)} >
    <div>
      <span style={_style.summary(palette)} >Resource not found</span>
      <span style={_style.errorCode(palette)} >Error 404</span>
    </div>
    <div style={_style.details(palette)} >The requested resource could not be found</div>
  </div>
)

NotFound.propTypes = {
  muiTheme: PropTypes.object.isRequired,
}

export default muiThemeable()(NotFound)
