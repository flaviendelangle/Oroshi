import React, { Component } from 'react'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar';

import MainDrawer from './components/MainDrawer'
import { showMainDrawer } from "./components/MainDrawer/actions";

class Header extends Component {
  
  getChildByClassName = className => {
    const children = this.props.children;
    if (Array.isArray(children)) {
      for(let i=0; i<children.length; i++) {
        if (children[i].props.className === className) {
          return children[i].props.children;
        }
      }
    } else if (children.props.className === className) {
      return children;
    } else {
      return (null);
    }
  };
  
  getDrawerLinks = () => {
    return this.getChildByClassName('menu');
  };
  
  getSearchBar = () => {
    return this.getChildByClassName('search');
  };
  
  getActionsButton = () => {
    return this.getChildByClassName('actions');
  };
  
  render() {
    return (
      <div>
        <AppBar
          title={this.props.title}
          onLeftIconButtonTouchTap={() => this.props.openMainDrawer(true)}
        >
          {this.getSearchBar()}
          {this.getActionsButton()}
        </AppBar>
        <MainDrawer>
          {this.getDrawerLinks()}
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