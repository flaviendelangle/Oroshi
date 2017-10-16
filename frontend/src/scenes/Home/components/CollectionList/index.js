import React, { Component } from 'react'
import { connect } from 'react-redux'

import CollectionBox from './components/CollectionBox'
import NewCollectionButton from './components/NewCollectionButton'

import './style.css';

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
    } /* ,{
      title: 'A voir',
      pk: 4
    },{
      title: 'A voir',
      pk: 5
    },{
      title: 'A voir',
      pk: 6
    },{
      title: 'A voir',
      pk: 7
    },{
      title: 'A voir',
      pk: 8
    },{
      title: 'A voir',
      pk: 9
    },{
      title: 'A voir',
      pk: 10
    } */
  ];
  
  constructor(props) {
    super(props);
  }
  
  mapCollections() {
    return this.collections.map((collection) => {
      return (
        <CollectionBox key={collection.pk} data={collection} editing={this.props.editing}/>
      )
    });
  }
  
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