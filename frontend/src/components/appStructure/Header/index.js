import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar';

import MainDrawer from './components/MainDrawer/index'
import { showMainDrawer } from './components/MainDrawer/actions';
import { connect } from 'services/redux';

class Header extends Component {
  
  render() {
    const { isDrawerOpen, isPublic, title, showTitle, openMainDrawer } = this.props;
    return (
      <div>
        <AppBar
          title={ showTitle ? title : ''}
          onLeftIconButtonTouchTap={_ => {
            openMainDrawer(true)
          }}
          showMenuIconButton={!isPublic}
        >
          {this.searchBar}
          {this.actionsButton}
        </AppBar>
        <MainDrawer
          title={title}
          isPublic={isPublic}
          isOpen={isDrawerOpen}
          onOpen={openMainDrawer}
        />
      </div>
    )
    
  }
  
}

const mapStateToProps = ({ header }) => {
  return {
    isDrawerOpen: header.isDrawerOpen,
  };
};

const mapDispatchToProps = (dispatch, { type, collection }) => {
  return {
    openMainDrawer: show => dispatch(showMainDrawer(type, collection, show))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);