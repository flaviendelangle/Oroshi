import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionExit from 'material-ui/svg-icons/action/exit-to-app';
import AVMovie from 'material-ui/svg-icons/av/movie';
import ActionSettings from 'material-ui/svg-icons/action/settings';
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
  
  get sceneLines() {
    const { scene, palette, type, collection } = this.props;
    const style = {
      color: palette.alternateTextColor
    };
    if (scene === 'content') {
      return [
        <Link to={`/collections/${type}/${collection.pk}/settings/`} key={1}>
          <ActionSettings style={style}/>
          <div>Collection Settings</div>
        </Link>
      ];
    } else if (scene === 'settings') {
      return [
        <Link to={`/collections/${type}/${collection.pk}/`} key={1}>
          <AVMovie style={style}/>
          <div>Return to my collection</div>
        </Link>
    
      ];
    }
    return [];
  }
  
  renderLines = _ => {
    const lines = [
      ...this.GENERIC_LINES_BEFORE,
      ...this.sceneLines,
      <Divider key={-1}/>,
      ...this.GENERIC_LINES_AFTER
    ];
    return lines.map((el, index) => {
      if (el.type.name === 'Divider') {
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
    const { isPublic, isOpen, title, onOpen } = this.props;
    if (isPublic) {
      return null;
    }
    return (
        <Drawer
          open={isOpen}
          docked={false}
          onRequestChange={open => onOpen(open) }
        >
          <AppBar
            title={title}
            onLeftIconButtonTouchTap={_ => onOpen(false)}
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
  return {}
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