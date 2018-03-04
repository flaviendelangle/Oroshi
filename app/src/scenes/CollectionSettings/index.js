import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Progress from '../../components/generics/Progress'
import Settings from '../../components/appStructure/Settings'
import SummaryParameters from './SummaryParameters'
import LanguageParameters from './LanguageParameters'
import ExportParameters from './ExportParameters'
import DataImporter from './DataImporter'
import CoverCustomization from './CoverCustomization'

import { getSettings } from '../../services/actions/collections'
import { connect } from '../../services/redux'


const SECTIONS = {
  summary: {
    component: SummaryParameters,
    label: 'Summary',
  },
  languages: {
    component: LanguageParameters,
    label: 'Languages',
  },
  exports: {
    component: ExportParameters,
    label: 'Export your data',
  },
  imports: {
    component: DataImporter,
    label: 'Import data',
  },
  cover: {
    component: CoverCustomization,
    label: 'Cover customization',
  },
}

const DEFAULT_SECTION = 'summary'

class CollectionSettings extends Component {
  static propTypes = {
    synchronize: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    collection: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    redirect: PropTypes.bool,
    isLoaded: PropTypes.bool.isRequired,
    config: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { synchronize, isLoaded } = this.props
    if (!isLoaded) {
      synchronize()
    }
  }

  componentWillReceiveProps(newProps) {
    const { redirect, history } = this.props
    if (
      !redirect &&
      newProps.redirect
    ) {
      history.push(newProps.redirect)
    }
  }

  render() {
    const {
      isLoaded,
    } = this.props

    if (!isLoaded) {
      return <Progress />
    }
    return (
      <Settings
        {...this.props}
        sections={SECTIONS}
        defaultSection={DEFAULT_SECTION}
      />
    )
  }
}

const mapStateToProps = ({ main, settings }) => ({
  isLoaded: main.isLoaded,
  collection: main.collection,

  redirect: settings.redirect,
})

const mapDispatchToProps = (dispatch, { type, collection }) => ({
  synchronize: () => dispatch(getSettings(type, collection)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CollectionSettings)
