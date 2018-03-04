import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import { List, ListItem } from 'material-ui/List'

import styles from './Section.scss'


const Section = ({ children }) => (
  <div className={styles.Section} >
    {children}
  </div>
)

Section.propTypes = {
  children: PropTypes.any.isRequired,
}

Section.Title = ({ className, ...props }) => {
  const titleClasses = cx({
    [styles.Title]: true,
    [className]: !!className,
  })
  return <div {...props} className={titleClasses} />
}

Section.Title.propTypes = {
  className: PropTypes.string,
}

Section.Content = ({ className, ...props }) => {
  const contentClasses = cx({
    [styles.Content]: true,
    [className]: !!className,
  })
  return (
    <div className={contentClasses}>
      <List {...props} />
    </div>
  )
}

Section.Content.propTypes = {
  className: PropTypes.string,
}

Section.Item = ({ className, ...props }) => {
  const itemClasses = cx({
    [styles.Item]: true,
    [className]: !!className,
  })
  return <ListItem {...props} className={itemClasses} />
}

Section.Item.propTypes = {
  className: PropTypes.string,
}

export default Section
