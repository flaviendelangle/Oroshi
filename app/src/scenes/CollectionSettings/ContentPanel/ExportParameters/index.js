import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import FileDownload from 'material-ui/svg-icons/file/file-download'

import Section from '../Section/index'
import { exportCollection as _exportCollection } from '../../../../services/actions/collections/index'


const ExportParameters = ({ exportCollection }) => (
  <Section>
    <Section.Title>Export your data</Section.Title>
    <Section.Content>
      <Section.Item
        rightIcon={<FileDownload />}
        primaryText="Export as CSV"
        onClick={() => exportCollection('csv')}
      />
      <Section.Item
        rightIcon={<FileDownload />}
        primaryText="Export as JSON"
        onClick={() => exportCollection('json')}
      />
    </Section.Content>
  </Section>
)

ExportParameters.propTypes = {
  exportCollection: PropTypes.func.isRequired,
}

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch, { type, collection }) => ({
  exportCollection: (format) => {
    dispatch(_exportCollection(type, collection, format))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExportParameters)
