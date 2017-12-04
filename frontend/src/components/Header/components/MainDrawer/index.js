import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import ActionHome from 'material-ui/svg-icons/action/home';
import muiThemeable from 'material-ui/styles/muiThemeable';

import { showMainDrawer } from './actions';

import './style.css';

class MainDrawer extends Component {
  
  constructor(props) {
    super();
    this.props = props;
    this.open = props.open;
  }
  
  renderLines = () => {
    const style = { color: this.props.muiTheme.palette.alternateTextColor };
    const GENERIC_LINES = [
      (
        <Link to='/'>
          <ActionHome style={style}/>
          <div>Home</div>
        </Link>
      ),(
        <Link to='/settings/'>
          <ActionSettings style={style}/>
          <div>Settings</div>
        </Link>
      )
    ];
    
    const lines = [...GENERIC_LINES, this.props.children];
    return lines.map((el, index) => {
      return (
        <MenuItem key={index}>
          {el}
        </MenuItem>
      );
    });
  };
  
  render() {
    return (
        <Drawer
          open={this.props.isOpen}
          docked={false}
          onRequestChange={open => this.open(open) }
        >
          <div className="drawer">
            {this.renderLines()}
          </div>
        </Drawer>
    )
  }
  
}

const mapStateToProps = state => {
  return {
    isOpen: state.header.mainDrawer.isOpen
  }
};

const mapDispatchToProps = dispatch => {
  return {
    open: show => dispatch(showMainDrawer(show))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(muiThemeable()(MainDrawer));