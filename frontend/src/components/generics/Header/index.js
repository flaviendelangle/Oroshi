import React, { Component } from 'react'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar';

import MainDrawer from './components/MainDrawer/index'
import { showMainDrawer } from './components/MainDrawer/actions';

class Header extends Component {
  
  get drawerLinks() {
    return this.getChildrenByClassName('menu');
  };
  
  get searchBar() {
    return this.getChildrenByClassName('search');
  };
  
  get actionsButton() {
    return this.getChildrenByClassName('actions');
  };
  
  /**
   * Get all the children of the component which have the right className
   * @param {string} className - className of which we want to find all matching children
   * @returns {Array<Component>} the children with the right className
   */
  getChildrenByClassName = className => {
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