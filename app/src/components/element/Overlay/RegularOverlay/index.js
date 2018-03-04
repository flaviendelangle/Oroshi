import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import Grade from '../../../generics/Grade/index'

import styles from './RegularOverlay.scss'


const RegularOverlay = ({
  topLeftAction,
  topRightAction,
  isPublic,
  creationMode,
  onSave,
  onDestroy,
  data,
}) => (
  <div className={styles.RegularOverlay} >
    <div>
      <Grade
        className={styles.Grade}
        value={data.getNote()}
      />
    </div>
    <TopLeftAction isPublic={isPublic} >
      {topLeftAction}
    </TopLeftAction>
    <TopRightAction isPublic={isPublic} >
      {topRightAction}
    </TopRightAction>
    <Footer
      creationMode={creationMode}
      alreadyInCollection={data.isInCollection()}
      onSave={onSave}
      onDestroy={onDestroy}
      isPublic={isPublic}
    />
  </div>
)

RegularOverlay.propTypes = {
  data: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onDestroy: PropTypes.func.isRequired,
  isPublic: PropTypes.bool,
  creationMode: PropTypes.bool, // RENAME

  topLeftAction: PropTypes.object,
  topRightAction: PropTypes.object,
}

const Footer = ({
  creationMode,
  alreadyInCollection,
  onSave,
  onDestroy,
  isPublic,
}) => {
  if (isPublic) {
    return null
  }
  let Content
  if (
    creationMode &&
    !alreadyInCollection
  ) {
    Content = (
      <div
        role="button"
        tabIndex={0}
        className={styles.Content}
        onClick={onSave}
        style={{ background: 'rgba(76,175,80,0.8)' }}
      >
        ADD
      </div>
    )
  } else {
    Content = (
      <div
        role="button"
        tabIndex={0}
        className={styles.Content}
        onClick={onDestroy}
        style={{ background: 'rgba(244,67,54,0.8)' }}
      >
        REMOVE
      </div>
    )
  }
  return <div className={styles.Footer}>{Content}</div>
}

Footer.propTypes = {
  onSave: PropTypes.func.isRequired,
  onDestroy: PropTypes.func.isRequired,
  isPublic: PropTypes.bool,
  alreadyInCollection: PropTypes.bool, // RENAME
  creationMode: PropTypes.bool, // RENAME
}

const TopLeftAction = ({
  children,
  isPublic,
}) => {
  const classes = cx({
    [styles.TopLeftIcon]: true,
    [styles.TopLeftIconPublic]: isPublic,
    [styles.TopLeftIconPrivate]: !isPublic,
  })
  return (
    <div className={classes} >
      {children}
    </div>
  )
}

TopLeftAction.propTypes = {
  isPublic: PropTypes.bool,
  children: PropTypes.node,
}

const TopRightAction = ({
  children,
  isPublic,
}) => {
  const classes = cx({
    [styles.TopRightIcon]: true,
    [styles.TopRightIconPublic]: isPublic,
    [styles.TopRightIconPrivate]: !isPublic,
  })
  return (
    <div className={classes} >
      {children}
    </div>
  )
}

TopRightAction.propTypes = {
  isPublic: PropTypes.bool,
  children: PropTypes.node,
}

export default RegularOverlay
