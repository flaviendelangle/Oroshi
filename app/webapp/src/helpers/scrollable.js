import React from 'react'
import ScrollArea from 'react-scrollbar'

import styles from './helpers.scss'


const scrollable = WrappedComponent => (
  props => (
    <ScrollArea
      speed={0.8}
      horizontal={false}
      className={styles.scrollable}
    >
      <WrappedComponent {...props} />
    </ScrollArea>
  )
)

export default scrollable
