import React, { Component } from 'react'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar';

import MainDrawer from './components/MainDrawer/index'
import { showMainDrawer } from './components/MainDrawer/actions';

class Header extends Component {
  
  render() {
    return (
      <div>
        <AppBar
          title={ this.props.showTitle ? this.props.title : ''}
          onLeftIconButtonTouchTap={_ => this.props.openMainDrawer(true)}
          showMenuIconButton={!this.props.isPublic}
        >
          {this.searchBar}
          {this.actionsButton}
        </AppBar>
        <MainDrawer title={this.props.title} isPublic={this.props.isPublic} >
          {this.drawerLinks}
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