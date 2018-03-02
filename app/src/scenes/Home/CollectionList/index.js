import React from 'react'
import PropTypes from 'prop-types'

import CollectionBox from './CollectionBox/index'
import NewCollectionButton from './NewCollectionButton/index'

import styles from './CollectionList.scss'


const CollectionList = ({ data }) => (
  <div className={styles.CollectionList}>
    {
      data.map((collection) => {
        const { type, pk } = collection
        return (
          <CollectionBox
            key={`${type}_${pk}`}
            data={collection}
          />
        )
      })
    }
    <NewCollectionButton />
  </div>
)

CollectionList.propTypes = {
  data: PropTypes.array.isRequired,
}

export default CollectionList
