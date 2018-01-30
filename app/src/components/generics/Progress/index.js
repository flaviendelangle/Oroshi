import React from 'react'
import PropTypes from 'prop-types';

import CircularProgress from 'material-ui/CircularProgress';
import muiThemeable from 'material-ui/styles/muiThemeable';

import * as _style from './style';


const Progress = ({ muiTheme: { palette }, message }) => (
  <div style={_style.container} >
    <div style={_style.progress} >
      <CircularProgress color={palette.alternateTextColor} />
    </div>
    { message ? <div style={_style.message(palette)} >{message}</div> : null }
  </div>
);

Progress.propTypes = {
  muiTheme: PropTypes.object.isRequired,
  message: PropTypes.string,
};

export default muiThemeable()(Progress);
