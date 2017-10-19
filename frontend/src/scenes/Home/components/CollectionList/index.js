import React, { Component } from 'react'
import { connect } from 'react-redux'

import CollectionBox from './components/CollectionBox'
import NewCollectionButton from './components/NewCollectionButton'

import './style.css';

class CollectionList extends Component {
  
  mapCollections = () => {
    return this.props.data.map(collection => {
      return (
        <CollectionBox
          key={collection.pk}
          data={collection}
          editing={this.props.editing}
        />
      )
    });
  };
  
  render() {
    return (
      <div className="collection-list-container">
        <div>
          {this.mapCollections()}
          <NewCollectionButton editing={this.props.editing}/>
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
)(CollectionList);