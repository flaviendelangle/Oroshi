import React, { Component } from 'react'
import { connect } from 'react-redux'

import CollectionList from './components/CollectionList'
import ManageButton from './components/ManageButton'

const containerStyle = {
  width: '80%',
  left: '10%',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
};

class Home extends Component {
  
  state = {
    editing: true
  };
  
  
  render() {
    return (
      <div>
        <div style={containerStyle}>
          <CollectionList editing={this.state.editing} />
          <ManageButton editing={this.state.editing} onClick={() => this.setState({editing: !this.state.editing}) } />
        </div>
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
)(Home);