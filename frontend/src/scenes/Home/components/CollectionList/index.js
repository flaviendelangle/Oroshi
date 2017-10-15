import React, { Component } from 'react'
import { connect } from 'react-redux'

import CollectionBox from './components/CollectionBox'

const listStyle = {
  textAlign: 'center'
};

class CollectionList extends Component {
  
  collections = [
    {
      title: 'MKV &co',
      pk: 1
    },{
      title: 'Blurays',
      pk: 2
    },{
      title: 'A voir',
      pk: 3
    },
    
  ];
  
  mapCollections() {
    return this.collections.map((collection) => {
      return (
        <CollectionBox key={collection.pk} data={collection} editing={this.props.editing}/>
      )
    });
  }
  
  render() {
    return (
      <div style={listStyle}>
        {this.mapCollections()}
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