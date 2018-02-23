import React from 'react'
import PropTypes from 'prop-types'

import CircularProgress from 'material-ui/CircularProgress'

import styles from './Progress.scss'


const Progress = ({ message }) => (
  <div className={styles.Progress} >
    <div className={styles.Content} >
      <CircularProgress className={styles.Icon} />
    </div>
    {
      message &&
      <div className={styles.Message} >{message}</div>
    }
  </div>
)

Progress.propTypes = {
  message: PropTypes.string,
}

export default Progress
