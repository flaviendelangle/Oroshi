import React, { Component } from 'react'
import { connect } from 'react-redux'

import CollectionBox from './components/CollectionBox'

const containerStyle = {
  width: '80%',
  left: '10%',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
};

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
      pk: 2
    },
    
  ];
  
  mapCollections() {
    return this.collections.map((collection) => {
      return (
        <CollectionBox key={collection.pk} data={collection}/>
      )
    });
  }
  
  render() {
    return (
      <div style={containerStyle}>
        <div style={listStyle}>
          {this.mapCollections()}
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