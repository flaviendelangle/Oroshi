import React, { Component } from 'react'
import { connect } from 'react-redux'

class Collection extends Component {
  
  state = {
    editing: true
  };
  
  constructor() {
    super();
  }
  
  render() {
    //console.log(this.props.params);
    return (
      <div>
        HEY !
      </div>
    )
    
  }
  
}

const mapStateToProps = state => {
  return {
  }
};

const mapDispatchToProps = dispatch => {
  return {
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Collection);