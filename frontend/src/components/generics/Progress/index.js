import React from 'react'

import CircularProgress from 'material-ui/CircularProgress';
import muiThemeable from 'material-ui/styles/muiThemeable';

const progressStyle = {
  width: 40,
  height: 40,
  position: 'absolute',
  left: 'calc(50% - 20px)',
  top: 'calc(50% - 20px)',
};

const Progress = ({ muiTheme }) => {
  const color= muiTheme.palette.alternateTextColor;
  return (
    <div style={progressStyle}>
      <CircularProgress color={color} />
    </div>
  );
};

export default muiThemeable()(Progress);