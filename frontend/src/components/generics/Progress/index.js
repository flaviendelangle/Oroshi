import React from 'react'

import CircularProgress from 'material-ui/CircularProgress';
import muiThemeable from 'material-ui/styles/muiThemeable';

import * as _style from './style';


const Progress = ({ muiTheme, message }) => {
  const palette = muiTheme.palette;
  return (
    <div style={_style.container} >
      <div style={_style.progress} >
        <CircularProgress color={palette.alternateTextColor} />
      </div>
      { message ? <div style={_style.message(palette)} >{message}</div> : null }
    </div>
  );
};

export default muiThemeable()(Progress);