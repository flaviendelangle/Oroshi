import React from 'react'
import PropTypes from 'prop-types'

import Poster from '../../element/Poster'

import styles from './CollectionCover.scss'


const CollectionCover = ({
  covers,
  onClick,
  creationMode,
  ratio,
}) => {
  const completeCover = [
    ...covers,
    ...Array.from({ length: 3 - covers.length }, () => null),
  ]

  return (
    <div
      className={styles.CollectionCover}
      onClick={onClick}
      data-ratio={ratio}
      role="button"
      tabIndex={0}
    >
      {
        completeCover.map((el, index) => (
          <div
            className={styles.Cover}
            data-place={index}
            key={index /* eslint-disable-line react/no-array-index-key */}
          >
            {
              el ?
                <Poster
                  path={el.getPosterPath()}
                  title=""
                  ratio={ratio}
                /> :
                <div className={styles.FakePoster}>
                  { creationMode ? '+' : '?' }
                </div>
            }
          </div>
        ))
      }
    </div>
  )
}

CollectionCover.defaultProps = {
  covers: [],
  ratio: 0.5,
}

CollectionCover.propTypes = {
  covers: PropTypes.array,
  creationMode: PropTypes.bool,
  onClick: PropTypes.func,
  ratio: PropTypes.number,
}

export default CollectionCover
