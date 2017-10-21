import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem';
import ActionSettings from 'material-ui/svg-icons/action/settings'

import { showMainDrawer } from './actions'

import './style.css'

class MainDrawer extends Component {
  
  GENERIC_LINES = [
    (
      <Link to='/settings/'>
        <ActionSettings/>
        <div>Settings</div>
      </Link>
    )
  ];
  
  constructor(props) {
    super();
    this.props = props;
    this.open = props.open;
  }
  
  renderLines = () => {
    let i=0;
    const lines = this.GENERIC_LINES.concat(this.props.children).map(el => {
      return (<MenuItem key={i++}>{el}</MenuItem>);
    });
    return lines;
  };
  
  render() {
    return (
        <Drawer
          open={this.props.isOpen}
          docked={false}
          onRequestChange={(open) => this.open(open) }
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
)(MainDrawer);