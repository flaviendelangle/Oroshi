import React, { Component } from 'react';
import { connect } from 'react-redux';
import muiThemeable from 'material-ui/styles/muiThemeable';

import Line from './components/Line';
import { getCollectionSettingsState } from 'containers/reducer'

import * as _style from './style';

class MenuPanel extends Component {
  
  get palette() {
    return this.props.muiTheme.baseTheme.palette;
  }
  
  render() {
    return (
      <div style={_style.panel}>
        <Line active={this.props.active === 'summary'} value="summary">
          Summary
        </Line>
        {/*<Line active={this.props.active === 'spoilers'} value="spoilers">
          Spoilers
        </Line>*/}
        <Line active={this.props.active === 'languages'} value="languages">
          Languages
        </Line>
        <Line active={this.props.active === 'exports'} value="exports">
          Export your data
        </Line>
        <Line active={this.props.active === 'imports'} value="imports">
          Import data
        </Line>
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