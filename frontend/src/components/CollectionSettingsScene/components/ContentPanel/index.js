import React, { Component } from 'react';
import { connect } from 'react-redux';
import muiThemeable from 'material-ui/styles/muiThemeable';

import SummaryParameters from './components/SummaryParameters';
import LanguageParameters from './components/LanguageParameters';
import ExportParameters from './components/ExportParameters';

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
        <SummaryParameters scene={this.props.scene} />
        <LanguageParameters scene={this.props.scene} />
        <ExportParameters scene={this.props.scene} />
      </div>
    );
    
  }
  
}

const mapStateToProps = state => {
  return {
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(muiThemeable()(MenuPanel));