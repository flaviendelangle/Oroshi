import React from 'react'
import PropTypes from 'prop-types'

import styles from './ElementLine.scss'


const ElementLine = ({ children }) => (
  <div className={styles.ElementLine}>
    {children}
  </div>
)

ElementLine.propTypes = {
  children: PropTypes.node,
}

export const groupByLine = (elements, elementsPerLine) => {
  if (elements.length === 0) {
    return []
  }
  const lines = [[]]
  elements.forEach((el) => {
    if (lines[lines.length - 1].length === elementsPerLine) {
      lines.push([])
    }
    lines[lines.length - 1].push(el)
  })
  return lines
}

export default ElementLine
