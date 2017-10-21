import React, { Component } from 'react'
import { connect } from 'react-redux'
import {List, ListItem} from 'material-ui/List'
import FileDownload from 'material-ui/svg-icons/file/file-download';

import { exportAsCSV } from './actions'

class Exports extends Component {
  
  render() {
    return (
      <List>
        <ListItem
          rightIcon={<FileDownload />}
          primaryText="Export my collection"
          secondaryText="Download as CSV"
          onClick={() => this.props.exportAsCSV(this.props.collection)}
        />
      </List>
    );
  }
}

const mapStateToProps = state => {
  return {
    collection: state.collectionSettings.exports.collection
  }
};

const mapDispatchToProps = dispatch => {
  return {
    exportAsCSV: pk => dispatch(exportAsCSV(pk))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Exports);