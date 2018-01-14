import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar';

import MainDrawer from './components/MainDrawer'
import Search from './components/Search'
import OrderMenu from './components/OrderMenu';
import { showMainDrawer } from './components/MainDrawer/actions';
import { connect } from 'services/redux';

class Header extends Component {
  
  get autoComplete() {
    const { isAdding, layout, autoComplete } = this.props;
    if (isAdding || !autoComplete) {
      return [];
    }
    if (layout === 'stream') {
      return autoComplete.stream;
    }
    return autoComplete.grid;
  }
  
  render() {
    const {
      isDrawerOpen,
      isPublic,
      isAdding,
      title,
      showTitle,
      count,
      collection,
      type,
      query,
      scene,
      openMainDrawer,
    } = this.props;
    
    return (
      <div>
        <AppBar
          title={ showTitle ? title : ''}
          onLeftIconButtonTouchTap={_ => {
            openMainDrawer(true)
          }}
          showMenuIconButton={!isPublic}
        >
          {
            (scene === 'content') && [
            <Search
              key={1}
              title={title}
              type={type}
              query={query}
              count={count}
              isAdding={isAdding}
              collection={collection}
              autoComplete={this.autoComplete}
            />,
            <OrderMenu
              key={2}
              type={type}
              collection={collection}
            />,
            ]
          }
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

const mapStateToProps = ({ header, content, main }) => {
  const layout = content.layout;
  let count;
  if (layout === 'stream') {
    count = content.stream.getElementCount();
  } else {
    count = content.grid.getElementCount();
  }
  return {
    isDrawerOpen: header.isDrawerOpen,
    found: content.found,
    layout: content.layout,
    collection: content.collection,
    autoComplete: content.autoComplete,
  
    title: header.title,
    query: header.query,
    
    isAdding: main.isAdding,
  
    count
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