import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

const containerStyle = {
  width: 500,
  left: 'calc(50% - 200px)',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  lineHeight: '1.5em',
  padding: 15
};


class Help extends Component {
  
  render() {
    return (
      <Paper style={containerStyle} zDepth={3}>
        <div style={{paddingBottom: 15}}>
          Welcome to your new collection !
        </div>
        <div style={{paddingBottom: 15}}>
          You can start adding content by clicking on the button as the bottom right corner of your screen.
        </div>
        <div>
          If you need help, visit our <b>documentation page</b>
        </div>
      </Paper>
    );
  }
  
}

export default Help;