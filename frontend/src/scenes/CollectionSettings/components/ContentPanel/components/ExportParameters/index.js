import React, { Component } from 'react';
import { connect } from 'react-redux';

import FileDownload from 'material-ui/svg-icons/file/file-download';

import ParametersSection, { Line } from '../ParametersSection';
import { exportCollection } from 'services/actions/collections';
import { getCollectionSettingsState } from 'containers/reducer';


class ExportParameters extends Component {
  
  render() {
    const { exportCollection, data } = this.props;
    return (
      <ParametersSection>
        <div className="title">Export your data</div>
        <div className="content">
          <Line
            rightIcon={<FileDownload />}
            primaryText="Export as CSV"
            onClick={_ => exportCollection(data.pk, 'csv')}
          />
          <Line
            rightIcon={<FileDownload />}
            primaryText="Export as JSON"
            onClick={_ => exportCollection(data.pk, 'json')}
          />
        </div>
      </ParametersSection>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const root = getCollectionSettingsState(state, ownProps.scene).main;
  return {
    data: root.data
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    exportCollection: (pk, format) => {
      dispatch(exportCollection(ownProps.scene, pk, format));
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExportParameters);