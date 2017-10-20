import React, { Component } from 'react'
import { connect } from 'react-redux'

class Title extends Component {
  
  render() {
    return (
      <div>NOOOOO</div>
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
)(Title);