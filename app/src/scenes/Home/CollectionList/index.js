import React from 'react'
import PropTypes from 'prop-types'

import CollectionBox from './CollectionBox/index'
import NewCollectionButton from './NewCollectionButton/index'

import styles from './CollectionList.scss'


const COVER_SIZE = 0.75

const CollectionList = ({ collections }) => (
  <div className={styles.CollectionList}>
    {
      collections.map((collection) => {
        const { type, pk } = collection
        return (
          <CollectionBox
            key={`${type}_${pk}`}
            collection={collection}
            ratio={COVER_SIZE}
          />
        )
      })
    }
    <NewCollectionButton ratio={COVER_SIZE} />
  </div>
)

CollectionList.propTypes = {
  collections: PropTypes.array.isRequired,
}

export default CollectionList
