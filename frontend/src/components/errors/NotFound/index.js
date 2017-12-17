import React, { Component } from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';

import * as _style from './style';

class NotFound extends Component {
  
  render() {
    const palette = this.props.muiTheme.palette;
    return (
      <div style={_style.container(palette)}>
        <div>
          <span style={_style.summary(palette)}>Resource not found</span>
          <span style={_style.errorCode(palette)}>Error 404</span></div>
        <div style={_style.details(palette)}>The requested resource could not be found</div>
      </div>

    );
  }
  
}

export default muiThemeable()(NotFound);