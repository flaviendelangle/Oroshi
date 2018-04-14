import React from 'react'

import styles from '../Error.scss'


const NotFound = () => (
  <div className={styles.Error}>
    <div>
      <span className={styles.Summary}>Resource not found</span>
      <span className={styles.ErrorCode}>Error 404</span>
    </div>
    <div className={styles.Details}>The requested resource could not be found</div>
  </div>
)

export default NotFound
