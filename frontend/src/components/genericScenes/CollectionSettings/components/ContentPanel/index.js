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

  render() {
    return (
      <div style={this.panelStyle}>
        <Panel active={this.props.active} scene={this.props.scene} />
      </div>
    );
    
  }
  
}

/**
 * Return the component of a given settings section
 * @param {string} active - name of the current settings section
 * @returns {Component} component representing this settings section
 */
const getSectionComponent = active => {
  switch(active) {
    case 'summary':
      return SummaryParameters;
    case 'spoilers':
      return SpoilerParameters;
    case 'languages':
      return LanguageParameters;
    case 'exports':
      return ExportParameters;
    case 'imports':
      return DataImporter;
    default:
      return null;
  }
};

const Panel = ({ active, scene }) => {
  const Section = getSectionComponent(active);
  return Section ? <Section scene={scene} /> : null;
};

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