import React, { Component } from 'react'
import { connect } from 'react-redux'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import { Link } from 'react-router-dom'

import { showMainDrawer } from './actions'

class MainDrawer extends Component {
  
  constructor(props) {
    super();
    this.props = props;
    this.open = props.open;
  }
  
  render() {
    return (
        <Drawer
          open={this.props.isOpen}
          docked={false}
          onRequestChange={(open) => this.open(open) }
        >
          <Link to='/'>
            <MenuItem>
              Home
            </MenuItem>
          </Link>
          <Link to='/movies'>
            <MenuItem>
              Movies
            </MenuItem>
          </Link>
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