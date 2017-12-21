import React from 'react';

import ToggleOriginal from 'material-ui/Toggle';
import muiThemeable from 'material-ui/styles/muiThemeable';


const Toggle = ({ muiTheme, ...props }) => {
  
  
  return (
    <ToggleOriginal
      thumbSwitchedStyle={{ background: '#80CBC4'}}
      trackSwitchedStyle={{ background: 'rgb(117, 117, 117)'}}
      {...props}
    />
  );
  
};

export default muiThemeable()(Toggle);