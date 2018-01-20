import React, { Component } from 'react'
import PropTypes from 'prop-types';

import CollectionBox from './components/CollectionBox'
import NewCollectionButton from './components/NewCollectionButton'

import './style.css';


class CollectionList extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    editing: PropTypes.string.isRequired,
  };

  mapCollections = () => {
    const { data, editing } = this.props;
    return data.map((collection) => {
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

export default CollectionList;
