import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import styles from './Grade.scss'


const Grade = ({ className, value }) => {
  let grade
  let degree
  if (!value) {
    degree = 360
    grade = '?'
  } else {
    degree = parseInt(value * 36, 10)
    grade = String(value)
    if (Math.abs(value % 1) < 0.05) {
      grade += '.0'
    }
  }

  const gradeClasses = cx({
    [styles.Grade]: true,
    [styles.GradeGood]: value >= 6.67,
    [styles.GradeMedium]: value < 6.67 && value > 3.33,
    [styles.GradeMediocre]: value <= 3.33,
    [className]: !!className,
  })

  const coverClasses = cx({
    [styles.Cover]: true,
    [styles.CoverHidden]: degree > 90,
  })

  return (
    <div className={gradeClasses} >
      <div className={styles.ExternalCircle} />
      <div className={styles.InnerCircle} >
        {grade}
      </div>
      <Arc quarter={1} degree={degree} />
      <Arc quarter={2} degree={degree} />
      <Arc quarter={3} degree={degree} />
      <Arc quarter={4} degree={degree} />
      <div className={coverClasses} />
    </div>
  )
}

Grade.propTypes = {
  className: PropTypes.string,
  value: PropTypes.number.isRequired,
}

const Arc = ({ quarter, degree }) => {
  const angle = Math.min(quarter * 90, degree) - 45
  return (
    <div
      className={styles.Arc}
      style={{ transform: `rotate(${angle}deg)` }}
    />
  )
}

Arc.propTypes = {
  quarter: PropTypes.number.isRequired,
  degree: PropTypes.number.isRequired,
}

export default Grade
