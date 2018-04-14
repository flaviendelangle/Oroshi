import React from 'react'
import PropTypes from 'prop-types'

import styles from './FakePoster.scss'


const FakePoster = ({ creationMode, ratio }) => (
  <div className={styles.FakePoster} data-ratio={ratio} >
    { creationMode ? '+' : '?' }
  </div>
)

FakePoster.propTypes = {
  creationMode: PropTypes.bool,
  ratio: PropTypes.number,
}

FakePoster.defaultProps = {
  ratio: 1,
}

export default FakePoster
