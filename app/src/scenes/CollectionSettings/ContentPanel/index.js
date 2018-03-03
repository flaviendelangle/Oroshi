import React from 'react'
import PropTypes from 'prop-types'

import SummaryParameters from './SummaryParameters'
import LanguageParameters from './LanguageParameters'
import ExportParameters from './ExportParameters'
import DataImporter from './DataImporter'
import CoverCustomization from './CoverCustomization'

import { connect } from '../../../services/redux'

import styles from './ContentPanel.scss'


/**
 * Return the component of a given settings section
 * @param {string} active - name of the current settings section
 * @returns {Component} component representing this settings section
 */
const getSectionComponent = (active) => {
  switch (active) {
    case 'summary':
      return SummaryParameters
    // case 'spoilers':
    //   return SpoilerParameters
    case 'languages':
      return LanguageParameters
    case 'exports':
      return ExportParameters
    case 'imports':
      return DataImporter
    case 'cover':
      return CoverCustomization
    default:
      return null
  }
}

const ContentPanel = ({ active, ...props }) => {
  const Section = getSectionComponent(active)
  if (!Section) {
    return null
  }
  return (
    <div className={styles.ContentPanel}>
      <Section {...props} />
    </div>
  )
}

ContentPanel.propTypes = {
  active: PropTypes.string,
}

const mapStateToProps = ({ settings }) => ({
  active: settings.activeSection,
})

const mapDispatchToProps = () => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContentPanel)
