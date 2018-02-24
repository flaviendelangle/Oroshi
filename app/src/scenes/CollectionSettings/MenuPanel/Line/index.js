import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import cx from 'classnames'

import { goToSection } from './actions'

import styles from './Line.scss'


const Line = ({
  goTo,
  value,
  children,
  active,
}) => {
  const lineClasses = cx({
    [styles.Line]: true,
    [styles.LineActive]: active,
  })
  return (
    <div className={lineClasses} >
      <div
        role="button"
        tabIndex={0}
        className={styles.Content}
        onClick={() => goTo(value)}
      >
        {children}
      </div>
    </div>
  )
}

Line.propTypes = {
  goTo: PropTypes.func.isRequired,
  children: PropTypes.string,
  value: PropTypes.any,
  active: PropTypes.bool,
}

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch, { type, collection }) => ({
  goTo: value => dispatch(goToSection(type, collection, value)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Line)
