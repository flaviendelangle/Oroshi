import React, { Component } from 'react';
import { connect } from 'react-redux';
import ScrollArea from 'react-scrollbar'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Dropzone from 'react-dropzone'
import RaisedButton from 'material-ui/RaisedButton';
import { List } from 'material-ui/List'

import Line from './components/Line'
import Progress from './components/Progress'
import { getCollectionSettingsState } from 'containers/reducer';
import { importCSV, importElements } from 'services/actions/collections';

const sourceStyle = {
  textAlign: 'left',
  marginBottom: 20
};

const dropZoneStyle = {
  padding: 10,
  width: 300,
  maxWidth: '50%',
  height: 50,
  lineHeight: '50px',
  textAlign: 'center',
  margin: 'auto',
  borderColor: 'rgb(102, 102, 102)',
  borderStyle: 'dashed',
  borderRadius: 5,
  cursor: 'pointer'
};

const buttonStyle = {
  margin: '12px',
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)'
};

class DataImporter extends Component {
  
  state = {
    source: 'csv',
    csv: null
  };
  
  updateFile = upload => {
    this.setState({ csv: upload[0] });
  };
  
  handleClick = () => {
    switch(this.state.source) {
      case 'csv':
        return this.props.importCSV(this.state.csv);
      default:
        return null;
    }
  };
  
  renderSourcePicker = () => {
    return (
      <div style={{textAlign: 'center'}}>
      <SelectField
        floatingLabelText="Source"
        value={this.state.source}
        style={sourceStyle}
        onChange={(proxy, index, source) => this.setState({source})}
      >
        <MenuItem value="csv" primaryText="CSV File" />
        <MenuItem value="json" primaryText="JSON File" />
        <MenuItem value="imdb" primaryText="IMDB List" />
        <MenuItem value="tmdb" primaryText="TMDB List" />
      </SelectField>
      </div>
    );
  };
  
  renderFilePicker = format => {
    return (
      <div style={{height: 150}}>
        <Dropzone
          onDrop={this.updateFile}
          multiple={false}
          accept={'.' + format}
          style={dropZoneStyle}
        >
          {() => {
            if (this.state.csv) {
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
        style={buttonStyle}
        onClick={this.handleClick}
      />
    );
  };
  
  renderParameters = () => {
    switch(this.state.source) {
      case 'csv':
        return this.renderFilePicker('csv');
      default:
        return null;
    }
  };
  
  renderLines = () => {
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
  
  renderElementsList = () => {
    if(!this.state.elements) {
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
    if(!this.props.importFromFile && newProps.importFromFile) {
      this.props.importContent(newProps.data.pk, newProps.importFromFile.data);
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
    importContent: (collection, elements) => {
      dispatch(importElements(ownProps.scene, collection, elements, dispatch));
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataImporter);