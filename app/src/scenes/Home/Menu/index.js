import React from 'react'
import { Link } from 'react-router-dom'

import ActionExit from 'material-ui/svg-icons/action/exit-to-app'
import ActionAccountBox from 'material-ui/svg-icons/action/account-box'

import styles from './Menu.scss'


const Menu = () => (
  <div className={styles.Menu}>
    <Link to="/account/" className={styles.Line}>
      <ActionAccountBox />
      <div className={styles.Label}>Account</div>
    </Link>,
    <Link to="/logout/" className={styles.Line}>
      <ActionExit />
      <div className={styles.Label}>Logout</div>
    </Link>
  </div>
)

export default Menu
