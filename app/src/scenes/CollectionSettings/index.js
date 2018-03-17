import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Progress from '../../components/generics/Progress'
import Settings from '../../components/appStructure/Settings'
import SummaryParameters from './SummaryParameters'
import LanguageParameters from './LanguageParameters'
import ExportParameters from './ExportParameters'
import DataImporter from './DataImporter'
import CoverCustomization from './CoverCustomization'

import { destroy, getSettings, updateField } from '../../services/actions/collections'
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

class CollectionSettings extends PureComponent {
  static propTypes = {
    synchronize: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    collection: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    update: PropTypes.func.isRequired,
    deleteCollection: PropTypes.func.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    config: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { synchronize, isLoaded } = this.props
    if (!isLoaded) {
      synchronize()
    }
  }

  render() {
    const {
      isLoaded,
      update,
      deleteCollection,
    } = this.props

    if (!isLoaded) {
      return <Progress />
    }
    return (
      <Settings
        {...this.props}
        sections={SECTIONS}
        defaultSection={DEFAULT_SECTION}
        update={update}
        deleteCollection={deleteCollection}
      />
    )
  }
}

const mapStateToProps = ({ main }) => ({
  isLoaded: main.isLoaded,
  collection: main.collection,
})

const mapDispatchToProps = (dispatch, { type, collection }) => ({
  synchronize: () => dispatch(getSettings(type, collection)),
  update: (field, value) => dispatch(updateField(type, collection, field, value)),
  deleteCollection: () => dispatch(destroy(type, collection)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CollectionSettings)
