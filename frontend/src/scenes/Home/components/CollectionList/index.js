import React, { Component } from 'react'
import { connect } from 'react-redux'

import CollectionBox from './components/CollectionBox'
import NewCollectionButton from './components/NewCollectionButton'

import './style.css';

class CollectionList extends Component {
  
  mapCollections = () => {
    const { data, editing } = this.props;
    return data.map(collection => {
      const { type, pk } = collection;
      return (
        <CollectionBox
          key={`${type}_${pk}`}
          data={collection}
          editing={editing}
        />
      )
    });
  };
  
  render() {
    const { editing } = this.props;
    return (
      <div className="collection-list-container">
        <div>
          {this.mapCollections()}
          <NewCollectionButton editing={editing} />
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