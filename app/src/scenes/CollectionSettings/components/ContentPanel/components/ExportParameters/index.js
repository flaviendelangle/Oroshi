import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FileDownload from 'material-ui/svg-icons/file/file-download';

import ParametersSection, { Line } from '../ParametersSection';
import { exportCollection as _exportCollection } from 'services/actions/collections';


const ExportParameters = ({ exportCollection, data }) => (
  <ParametersSection>
    <div className="title">Export your data</div>
    <div className="content">
      <Line
        rightIcon={<FileDownload />}
        primaryText="Export as CSV"
        onClick={() => exportCollection(data.pk, 'csv')}
      />
      <Line
        rightIcon={<FileDownload />}
        primaryText="Export as JSON"
        onClick={() => exportCollection(data.pk, 'json')}
      />
    </div>
  </ParametersSection>
);

ExportParameters.propTypes = {
  exportCollection: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch, { type }) => ({
  exportCollection: (pk, format) => {
    dispatch(_exportCollection(type, pk, format));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExportParameters);
