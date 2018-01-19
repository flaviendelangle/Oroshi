import React from 'react';

import Paper from 'material-ui/Paper';

import * as _style from './style';


const Help = () => (
  <Paper style={_style.container} zDepth={3} >
    <div style={_style.line} >
      Welcome to your new collection !
    </div>
    <div style={_style.line} >
      You can start adding content by clicking on the button as the bottom right corner of your screen.
    </div>
    <div>
      If you need help, visit our <b>documentation page</b>
    </div>
  </Paper>
);

export default Help;