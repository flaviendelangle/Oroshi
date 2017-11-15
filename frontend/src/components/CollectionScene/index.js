import React, { Component } from 'react'
import { connect } from 'react-redux'

import Header from './components/Header'
import CollectionContent from './components/CollectionContent'
import Menu from './components/Menu'

import { get as getCollection } from 'services/actions/collections'

class CollectionScene extends Component {
  
  componentDidMount() {
    this.props.synchronize(this.props.match.params.collection_id);
  }
  
  render() {
    return (
      <div>
        <Header
          scene={this.props.scene}
        />
        <CollectionContent
          elementComponent={this.props.config.elementComponent}
          listColumns={this.props.config.listColumns}
          scene={this.props.scene}
        />
        <Menu
          scene={this.props.scene}
        />
      </div>
    )
    
  }
  
}

const mapStateToProps = state => {
  return {}
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    synchronize: collection => dispatch(getCollection(ownProps.scene, collection))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionScene);