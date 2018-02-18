import React, { Component } from 'react'
import PropTypes from 'prop-types'

import muiThemeable from 'material-ui/styles/muiThemeable'

import SummaryParameters from './components/SummaryParameters'
import Progress from 'components/generics/Progress'
// import SpoilerParameters from './components/SpoilerParameters'
import LanguageParameters from './components/LanguageParameters'
import ExportParameters from './components/ExportParameters'
import DataImporter from './components/DataImporter'
import { connect } from 'services/redux'


class MenuPanel extends Component {
  static propTypes = {
    muiTheme: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    collection: PropTypes.object.isRequired,
    data: PropTypes.object,
    active: PropTypes.string,

  }

  get panelStyle() {
    const { muiTheme: { palette } } = this.props
    return {
      position: 'absolute',
      top: 64,
      bottom: 0,
      right: 0,
      paddingTop: 50,
      width: '60%',
      backgroundColor: palette.primary2Color,
    }
  }

  render() {
    const {
      active,
      type,
      collection,
      data,
    } = this.props
    if (!data) {
      return (
        <div style={this.panelStyle} >
          <Progress />
        </div>
      )
    }
    return (
      <div style={this.panelStyle} >
        <Panel active={active} type={type} collection={collection} data={data} />
      </div>
    )
  }
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
    default:
      return null
  }
}

const Panel = ({
  active,
  type,
  collection,
  data,
}) => {
  const Section = getSectionComponent(active)
  if (!Section) {
    return null
  }
  return <Section type={type} collection={collection} data={data} />
}

Panel.propTypes = {
  active: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  collection: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
}

const mapStateToProps = ({ settings }) => ({
  active: settings.activeSection,
  data: settings.data,
})

const mapDispatchToProps = () => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(muiThemeable()(MenuPanel))
