import React from 'react'

import MenuPanel from './MenuPanel'
import ContentPanel from './ContentPanel'

import styles from './Settings.scss'


const Settings = props => (
  <div className={styles.Settings}>
    <MenuPanel {...props} />
    <ContentPanel {...props} />
  </div>
)

export default Settings
