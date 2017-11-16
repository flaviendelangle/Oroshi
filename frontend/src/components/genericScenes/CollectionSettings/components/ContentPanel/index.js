import React, { Component } from 'react';
import { connect } from 'react-redux';
import muiThemeable from 'material-ui/styles/muiThemeable';

import SummaryParameters from './components/SummaryParameters';
import SpoilerParameters from './components/SpoilerParameters';
import LanguageParameters from './components/LanguageParameters';
import ExportParameters from './components/ExportParameters';
import DataImporter from './components/DataImporter';
import { getCollectionSettingsState } from 'containers/reducer'

class MenuPanel extends Component {
  
  get palette() {
    return this.props.muiTheme.baseTheme.palette;
  }
  
  get panelStyle() {
    return {
      position: 'absolute',
      top: 64,
      bottom: 0,
      right: 0,
      paddingTop: 50,
      width: '60%',
      backgroundColor: this.palette.primary2Color
    };
  }
  
  renderPanel = () => {
    switch(this.props.active) {
      case 'summary':
        return <SummaryParameters scene={this.props.scene} />;
      case 'spoilers':
        return <SpoilerParameters scene={this.props.scene} />;
      case 'languages':
        return <LanguageParameters scene={this.props.scene} />;
      case 'exports':
        return <ExportParameters scene={this.props.scene} />;
      case 'imports':
        return <DataImporter scene={this.props.scene} />;
      default:
        return null;
    }
  };
  
  render() {
    return (
      <div style={this.panelStyle}>
        {this.renderPanel()}
      </div>
    );
    
  }
  
}

const mapStateToProps = (state, ownProps) => {
  const root = getCollectionSettingsState(state, ownProps.scene).main;
  return {
    active: root.activeSection
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(muiThemeable()(MenuPanel));