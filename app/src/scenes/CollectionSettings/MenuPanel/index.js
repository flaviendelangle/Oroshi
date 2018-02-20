import React, { Component } from 'react'
import PropTypes from 'prop-types'

import muiThemeable from 'material-ui/styles/muiThemeable'

import Line from './Line/index'
import { connect } from '../../../services/redux'

import * as _style from './style'


class MenuPanel extends Component {
  static propTypes = {
    muiTheme: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    collection: PropTypes.object.isRequired,
    active: PropTypes.string,
  }

  get palette() {
    return this.props.muiTheme.baseTheme.palette
  }

  isActive(section) {
    return this.props.active === section
  }

  render() {
    const { type, collection } = this.props
    return (
      <div style={_style.panel} >
        <Line
          active={this.isActive('summary')}
          value="summary"
          type={type}
          collection={collection}
        >
          Summary
        </Line>
        {/*
        <Line active={this.props.active === 'spoilers'} value="spoilers">
          Spoilers
        </Line>
        */}
        <Line
          active={this.isActive('languages')}
          value="languages"
          type={type}
          collection={collection}
        >
          Languages
        </Line>
        <Line
          active={this.isActive('exports')}
          value="exports"
          type={type}
          collection={collection}
        >
          Export your data
        </Line>
        <Line
          active={this.isActive('imports')}
          value="imports"
          type={type}
          collection={collection}
        >
          Import data
        </Line>
      </div>
    )
  }
}

const mapStateToProps = ({ settings }) => ({
  active: settings.activeSection,
})

const mapDispatchToProps = () => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(muiThemeable()(MenuPanel))
