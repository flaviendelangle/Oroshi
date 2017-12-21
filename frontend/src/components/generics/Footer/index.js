import React, { Component } from 'react'
import { connect } from 'react-redux'

import muiThemeable from 'material-ui/styles/muiThemeable';

import * as _style from './style';


class Footer extends Component {
  
  render() {
    if (!this.props.loaded || !this.props.found) {
      return null;
    }
    return (
      <div style={_style.container(this.props.muiTheme.palette)}>
        Build with the TMDb API
      </div>
    )
  }
  
}

const mapStateToProps = (state, ownProps) => {
  const contentRoot = state.collections.content[ownProps.scene];
  if (!contentRoot) {
    return {
      loaded: false,
      found: false
    };
  }
  return {
    loaded: contentRoot.loaded,
    found: contentRoot.found
  }
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(muiThemeable()(Footer));