import React, { Component } from 'react';
import { connect } from 'react-redux';
import FileDownload from 'material-ui/svg-icons/file/file-download';
import SocialShare from 'material-ui/svg-icons/social/share';

import ParametersSection from '../ParametersSection';
import { exportCollection } from './actions';
import { getCollectionSettingsState } from 'containers/reducer';

class ExportParameters extends Component {
  
  render() {
    return (
      <ParametersSection>
        <div className="title">Export your data</div>
        <div className="content">
          <div
            rightIcon={<SocialShare />}
            primaryText="Get your public link"
            onClick={() => {}}
          >
          </div>
          <div
            rightIcon={<FileDownload />}
            primaryText="Export as CSV"
            onClick={() => this.props.exportCollection(this.props.collection, 'csv')}
          >
          </div>
          <div
            rightIcon={<FileDownload />}
            primaryText="Export as JSON"
            onClick={() => this.props.exportCollection(this.props.collection, 'json')}
          >
          </div>
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

const mapDispatchToProps = dispatch => {
  return {
    exportCollection: (pk, format) => dispatch(exportCollection(pk, format))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExportParameters);