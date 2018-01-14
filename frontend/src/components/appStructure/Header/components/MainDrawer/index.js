import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionExit from 'material-ui/svg-icons/action/exit-to-app';
import muiThemeable from 'material-ui/styles/muiThemeable';

import { showMainDrawer } from './actions';
import { connect } from 'services/redux';

import './style.css';

class MainDrawer extends Component {
  
  get lineStyle() {
    return { color: this.props.muiTheme.palette.alternateTextColor };
  }
  
  get GENERIC_LINES_BEFORE() {
    return [
      (
        
        <Link to='/'>
          <ActionHome style={this.lineStyle} />
          <div>Home</div>
        </Link>
      ), (
        <Link to='/logout/'>
          <ActionExit style={this.lineStyle} />
          <div>Logout</div>
        </Link>
      ),
    ];
  }
  
  get GENERIC_LINES_AFTER() {
    return [];
  }
  
  renderLines = _ => {
    const lines = [
      ...this.GENERIC_LINES_BEFORE,
      <Divider key={-1}/>,
      this.props.children,
      ...this.GENERIC_LINES_AFTER
    ];
    return lines.map((el, index) => {
      if(el.type.name === 'Divider') {
        return el;
      }
      return (
        <MenuItem key={index}>
          {el}
        </MenuItem>
      );
    });
  };
  
  render() {
    const { isPublic, isOpen, title, open } = this.props;
    if(isPublic) {
      return null;
    }
    return (
        <Drawer
          open={isOpen}
          docked={false}
          onRequestChange={open => open(open) }
        >
          <AppBar
            title={title}
            onLeftIconButtonTouchTap={_ => open(false)}
          >
            {this.searchBar}
            {this.actionsButton}
          </AppBar>
          <div className="drawer">
            {this.renderLines()}
          </div>
        </Drawer>
    )
  }
  
}

const mapStateToProps = ({ header }) => {
  return {
    isOpen: header.mainDrawer.isOpen
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