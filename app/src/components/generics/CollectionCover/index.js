import React from 'react'
import PropTypes from 'prop-types'

import Poster from '../../element/Poster'

import styles from './CollectionCover.scss'


const CollectionCover = ({ covers }) => (
  <div className={styles.CollectionCover}>
    { covers.map((el, index) => (
      <div
        className={styles.Cover}
        data-place={index}
        key={index /* eslint-disable-line react/no-array-index-key */}
      >
        <Poster
          path={el.getPosterPath()}
          title=""
          ratio={0.5}
        />
      </div>
    ))}
  </div>
)

CollectionCover.propTypes = {
  covers: PropTypes.array.isRequired,
}

export default CollectionCover
