import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import muiThemeable from 'material-ui/styles/muiThemeable';

import './style.css'


class Details extends Component {
  
  render() {
    if(!this.props.show) {
      return null;
    }
    return (
      <Paper
        zDepth={3}
        className="details"
      >
      </Paper>
    )
  }
  
}


export default muiThemeable()(Details);