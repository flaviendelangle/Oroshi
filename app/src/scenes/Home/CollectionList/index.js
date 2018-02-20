import React, { Component } from 'react'
import PropTypes from 'prop-types'

import CollectionBox from './CollectionBox/index'
import NewCollectionButton from './NewCollectionButton/index'

import './style.css'


class CollectionList extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    editing: PropTypes.bool.isRequired,
  }

  mapCollections = () => {
    const { data, editing } = this.props
    return data.map((collection) => {
      const { type, pk } = collection
      return (
        <CollectionBox
          key={`${type}_${pk}`}
          data={collection}
          editing={editing}
        />
      )
    })
  }

  render() {
    const { editing } = this.props
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

export default CollectionList
