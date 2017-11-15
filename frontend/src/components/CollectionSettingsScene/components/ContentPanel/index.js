import React, { Component } from 'react';
import { connect } from 'react-redux';
import muiThemeable from 'material-ui/styles/muiThemeable';


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
      paddingLeft: 20,
      width: 'calc(60% - 20px)',
      backgroundColor: this.palette.primary2Color
    };
  }
  
  render() {
    return (
      <div style={this.panelStyle}>
        TEST
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