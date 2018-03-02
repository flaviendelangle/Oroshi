import React from 'react'
import PropTypes from 'prop-types'

import Poster from '../../element/Poster'

import styles from './CollectionCover.scss'


const CollectionCover = ({ covers, onClick, creationMode }) => (
  <div
    className={styles.CollectionCover}
    onClick={onClick}
    role="button"
    tabIndex={0}
  >
    {
      creationMode ?
        [1, 2, 3].map(i => (
          <div className={styles.FakePoster} data-place={i} >?</div>
        )) :
        covers.map((el, index) => (
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
        ))
    }
  </div>
)

CollectionCover.propTypes = {
  covers: PropTypes.array,
  creationMode: PropTypes.bool,
  onClick: PropTypes.func,
}

export default CollectionCover
