import React, { Component } from 'react';
import LinearProgress from 'material-ui/LinearProgress';

class Progress extends Component {
  
  render() {
    return (
      <LinearProgress mode="determinate" value={this.props.progress} />
    );
  }
}

export default Progress;