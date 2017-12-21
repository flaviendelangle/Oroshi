import React, { Component } from 'react';
import { connect } from 'react-redux';
import ScrollArea from 'react-scrollbar';
import Dropzone from 'react-dropzone';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { List } from 'material-ui/List';

import Line from './components/Line';
import Progress from './components/Progress';
import { getCollectionSettingsState } from 'containers/reducer';
import { importCSV, importJSON, importElements } from 'services/actions/collections';

import * as _style from './style';


class DataImporter extends Component {
  
  state = {
    source: 'csv',
    csv: null
  };
  
  /**
   * Update the csv file from which we want to retrieve the data
   * @param {Array<File>} upload - the files which have been selected by the user
   */
  updateFile = (format, upload) => {
    this.setState({ [format]: upload[0] });
  };
  
  /**
   * Handle the click to launch the importation
   */
  handleClick = _ => {
    switch(this.state.source) {
      case 'csv': {
        this.props.importCSV(this.state.csv);
        break;
      }
      case 'json': {
        this.props.importJSON(this.state.json);
        break;
      }
      default:
        break;
    }
  };
  
  renderSourcePicker = _ => {
    return (
      <div style={{textAlign: 'center'}}>
      <SelectField
        floatingLabelText="Source"
        value={this.state.source}
        style={_style.source}
        onChange={(proxy, index, source) => this.setState({source})}
      >
        <MenuItem value="csv" primaryText="CSV File" />
        <MenuItem value="json" primaryText="JSON File" />
        {/*<MenuItem value="imdb" primaryText="IMDB List" />
        <MenuItem value="tmdb" primaryText="TMDB List" />*/}
      </SelectField>
      </div>
    );
  };
  
  renderFilePicker = format => {
    return (
      <div style={{height: 150}}>
        <Dropzone
          onDrop={upload => this.updateFile(format, upload)}
          multiple={false}
          accept={'.' + format}
          style={_style.dropZone(!!this.state[format])}
        >
          {_ => {
            if (this.state[format]) {
              return 'File dropped successfully';
            }
            return 'Click to pick your ' + format.toUpperCase() + ' file';
          }}
        </Dropzone>
        {this.state[format] ? this.renderLaunchButton(format) : null}
      </div>
    );
  };
  
  renderLaunchButton = format => {
    return (
      <RaisedButton
        label="Import !"
        style={_style.button}
        onClick={this.handleClick}
      />
    );
  };
  
  renderParameters = _ => {
    switch(this.state.source) {
      case 'csv':
        return this.renderFilePicker('csv');
      case 'json':
        return this.renderFilePicker('json');
      default:
        return null;
    }
  };
  
  renderLines = _ => {
    let counter = 0;
    return this.state.elements.map(el => {
      return (
        <Line data={el}
          key={++counter}
          scene={this.props.scene}
        />
      );
    })
  };
  
  renderElementsList = _ => {
    if (!this.state.elements) {
      return null;
    }
    return (
      <div style={{height: 'calc(100% - 242px)'}}>
        <Progress progress={this.props.progress} />
        <List style={{height: 'calc(100% - 16px)', padding: 0}}>
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
  
  componentWillReceiveProps(newProps) {
    if (!this.props.importFromFile && newProps.importFromFile) {
      this.props.importContent(newProps.data, newProps.importFromFile.data);
      this.setState({ elements: newProps.importFromFile.data });
    }
  }
  
  render() {
    return (
      <div style={{height: '100%'}}>
        {this.renderSourcePicker()}
        {this.renderParameters()}
        {this.renderElementsList()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const root = getCollectionSettingsState(state, ownProps.scene);
  return {
    data: root.main.data,
    importFromFile: root.dataImporter.importFromFile,
    progress: root.dataImporter.progress
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    importCSV: file => dispatch(importCSV(ownProps.scene, file)),
    importJSON: file => dispatch(importJSON(ownProps.scene, file)),
    importContent: (collection, elements) => {
      dispatch(importElements(ownProps.scene, collection, elements, dispatch));
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataImporter);