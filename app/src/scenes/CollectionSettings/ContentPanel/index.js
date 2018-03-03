import React from 'react'
import PropTypes from 'prop-types'

import SummaryParameters from './SummaryParameters'
import LanguageParameters from './LanguageParameters'
import ExportParameters from './ExportParameters'
import DataImporter from './DataImporter'
import CoverCustomization from './CoverCustomization'

import { connect } from '../../../services/redux'

import styles from './ContentPanel.scss'


const ContentPanel = ({
  active,
  type,
  collection,
}) => (
  <div className={styles.ContentPanel}>
    <Panel active={active} type={type} collection={collection} /> :
  </div>
)

ContentPanel.propTypes = {
  type: PropTypes.string.isRequired,
  collection: PropTypes.object.isRequired,
  active: PropTypes.string,
}


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

const Panel = ({
  active,
  type,
  collection,
}) => {
  const Section = getSectionComponent(active)
  if (!Section) {
    return null
  }
  return <Section type={type} collection={collection} />
}

Panel.propTypes = {
  active: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  collection: PropTypes.object.isRequired,
}

const mapStateToProps = ({ settings }) => ({
  active: settings.activeSection,
})

const mapDispatchToProps = () => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContentPanel)
