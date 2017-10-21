import React, { Component } from 'react'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar';

import MainDrawer from './components/MainDrawer'
import { showMainDrawer } from "./components/MainDrawer/actions";

class Header extends Component {
  
  render() {
    return (
      <div>
        <AppBar
          title={this.props.title}
          onLeftIconButtonTouchTap={() => this.props.openMainDrawer(true)}
        />
        <MainDrawer>
          {this.props.children}
        </MainDrawer>
      </div>
    )
    
  }
  
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    openMainDrawer: show => dispatch(showMainDrawer(show))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);