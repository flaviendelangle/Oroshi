import React, { Component } from 'react';
import ScrollArea from 'react-scrollbar';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { List } from 'material-ui/List';

import Line from './components/Line';
import Progress from './components/Progress';
import {
  importCSV as _importCSV,
  importJSON as _importJSON,
  importElements
} from 'services/actions/collections';
import { connect } from 'services/redux';

import * as _style from './style';


class DataImporter extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    progress: PropTypes.number.isRequired,
    importCSV: PropTypes.func.isRequired,
    importJSON: PropTypes.func.isRequired,
    importContent: PropTypes.func.isRequired,
    importFromFile: PropTypes.object,
  };

  state = {
    source: 'csv',
    csv: null,
  };

  componentWillReceiveProps(newProps) {
    const { importFromFile, importContent } = this.props;
    if (!importFromFile && newProps.importFromFile) {
      importContent(newProps.data, newProps.importFromFile.data);
      this.setState({ elements: newProps.importFromFile.data });
    }
  }

  updateFile = (format, upload) => {
    this.setState({ [format]: upload[0] });
  };

  /**
   * Handle the click to launch the importation
   */
  handleClick = () => {
    const { importCSV, importJSON } = this.props;
    const { source, csv, json } = this.state;
    switch (source) {
      case 'csv': {
        importCSV(csv);
        break;
      }
      case 'json': {
        importJSON(json);
        break;
      }
      default:
        break;
    }
  };

  renderSourcePicker = () => (
    <div style={{ textAlign: 'center' }} >
      <SelectField
        floatingLabelText="Source"
        value={this.state.source}
        style={_style.source}
        onChange={(proxy, index, source) => this.setState({ source })}
      >
        <MenuItem value="csv" primaryText="CSV File" />
        <MenuItem value="json" primaryText="JSON File" />
        {/*
        <MenuItem value="imdb" primaryText="IMDB List" />
        <MenuItem value="tmdb" primaryText="TMDB List" />
        */}
      </SelectField>
    </div>
  );

  renderFilePicker = format => (
    <div style={{ height: 150 }} >
      <Dropzone
        onDrop={upload => this.updateFile(format, upload)}
        multiple={false}
        accept={`.${format}`}
        style={_style.dropZone(!!this.state[format])}
      >
        {() => {
          if (this.state[format]) {
            return 'File dropped successfully';
          }
          return `Click to pick your ${format.toUpperCase()} file`;
        }}
      </Dropzone>
      {this.state[format] ? this.renderLaunchButton(format) : null}
    </div>
  );

  renderLaunchButton = () => (
    <RaisedButton
      label="Import !"
      style={_style.button}
      onClick={this.handleClick}
    />
  );

  renderParameters = () => {
    switch (this.state.source) {
      case 'csv':
        return this.renderFilePicker('csv');
      case 'json':
        return this.renderFilePicker('json');
      default:
        return null;
    }
  };

  renderLines = () => {
    const { type } = this.props;
    let counter = 0;
    return this.state.elements.map((el) => {
      counter += 1;
      return <Line data={el} key={counter} type={type} />;
    });
  };

  renderElementsList = () => {
    const { progress } = this.props;
    const { elements } = this.state;
    if (!elements) {
      return null;
    }
    return (
      <div style={{ height: 'calc(100% - 242px)' }} >
        <Progress progress={progress} />
        <List style={{ height: 'calc(100% - 16px)', padding: 0 }} >
          <ScrollArea
            speed={0.8}
            horizontal={false}
          >
            {this.renderLines()}
          </ScrollArea>
        </List>
      </div>
    );
  };

  render() {
    return (
      <div style={{ height: '100%' }} >
        {this.renderSourcePicker()}
        {this.renderParameters()}
        {this.renderElementsList()}
      </div>
    );
  }
}

const mapStateToProps = ({ settings: { dataImporter } }) => ({
  importFromFile: dataImporter.importFromFile,
  progress: dataImporter.progress,
});

const mapDispatchToProps = (dispatch, { type }) => ({
  importCSV: file => dispatch(_importCSV(type, file)),
  importJSON: file => dispatch(_importJSON(type, file)),
  importContent: (collection, elements) => {
    dispatch(importElements(type, collection, elements, dispatch));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DataImporter);
