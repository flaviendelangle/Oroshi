import React, { Component } from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';

import Line from './components/Line';
import { getCollectionSettingsState } from 'containers/reducer'
import { connect } from 'services/redux';

import * as _style from './style';


class MenuPanel extends Component {
  
  get palette() {
    return this.props.muiTheme.baseTheme.palette;
  }
  
  isActive(section) {
    return this.props.active === section;
  }
  
  render() {
    const { scene, collection } = this.props;
    return (
      <div style={_style.panel}>
        <Line
          active={this.isActive('summary')}
          value="summary"
          scene={scene}
          collection={collection}
        >
          Summary
        </Line>
        {/*<Line active={this.props.active === 'spoilers'} value="spoilers">
          Spoilers
        </Line>*/}
        <Line
          active={this.isActive('languages')}
          value="languages"
          scene={scene}
          collection={collection}
        >
          Languages
        </Line>
        <Line
          active={this.isActive('exports')}
          value="exports"
          scene={scene}
          collection={collection}
        >
          Export your data
        </Line>
        <Line
          active={this.isActive('imports')}
          value="imports"
          scene={scene}
          collection={collection}
        >
          Import data
        </Line>
      </div>
    );
    
  }
  
}

const mapStateToProps = ({ settings }) => {
  return {
    active: settings.activeSection
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(muiThemeable()(MenuPanel));