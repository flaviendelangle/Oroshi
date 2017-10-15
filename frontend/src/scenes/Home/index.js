import React, { Component } from 'react'
import { connect } from 'react-redux'

import CollectionList from './components/CollectionList'


class Home extends Component {
  
  render() {
    return (
      <div>
        <CollectionList/>
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