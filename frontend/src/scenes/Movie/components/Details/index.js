import React, { Component } from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper';

const paperStyle = {
};

class Details extends Component {
  
  render() {
    return (
      <Paper style={paperStyle} zDepth={3}>
        TOTO
      </Paper>
    );
    
  }
  
}

const mapStateToProps = state => {
  return {
  }
};

const mapDispatchToProps = dispatch => {
  return {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Details);