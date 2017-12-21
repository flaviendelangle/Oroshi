import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
//import ActionSettings from 'material-ui/svg-icons/action/settings';
import Divider from 'material-ui/Divider';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionExit from 'material-ui/svg-icons/action/exit-to-app';
import muiThemeable from 'material-ui/styles/muiThemeable';

import { showMainDrawer } from './actions';

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
      /*(
        <Link to='/settings/'>
          <ActionSettings style={this.lineStyle}/>
          <div>Settings</div>
        </Link>
      )*/
    ];
  }
  
  get GENERIC_LINES_AFTER() {
    return [];
  }
  
  constructor(props) {
    super();
    this.props = props;
    this.open = props.open;
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
    if(this.props.isPublic) {
      return null;
    }
    return (
        <Drawer
          open={this.props.isOpen}
          docked={false}
          onRequestChange={open => this.open(open) }
        >
          <AppBar
            title={this.props.title}
            onLeftIconButtonTouchTap={_ => this.props.open(false)}
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