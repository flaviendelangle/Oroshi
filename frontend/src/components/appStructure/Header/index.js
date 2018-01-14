import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import BackSpace from 'material-ui/svg-icons/hardware/keyboard-backspace';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import muiThemeable from 'material-ui/styles/muiThemeable';

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
  
  onButtonClick = () => {
    console.log('HEY');
    const { scene, openMainDrawer } = this.props;
    if (scene === 'content' || scene === 'settings') {
      openMainDrawer(true);
    }
  };
  
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
      muiTheme: { palette }
    } = this.props;
    return (
      <div>
        <AppBar
          iconElementLeft={
            <Icon
              palette={palette}
              scene={scene}
              link={`/collections/${type}/${collection.pk}/`}
              onClick={this.onButtonClick}
            />
          }
          title={ showTitle ? title : ''}
          onLeftIconButtonTouchTap={this.onButtonClick}
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
        {
          (scene === 'content' || scene === 'settings') &&
          <MainDrawer
            title={title}
            isPublic={isPublic}
            isOpen={isDrawerOpen}
            onOpen={openMainDrawer}
            scene={scene}
            palette={palette}
            collection={collection}
            type={type}
          />
        }
      </div>
    )
    
  }
  
}

const Icon = ({ scene, palette, link, ...props }) => {
  if (scene === 'suggestions'){
    return (
      <Link to={link}>
        <IconButton
          tooltip="Return to collection"
          iconStyle={{ color: palette.alternateTextColor }}
        >
          <BackSpace />
        </IconButton>
      </Link>

    );
  }
  return (
    <IconButton
      iconStyle={{ color: palette.alternateTextColor }}
      {...props}
    >
      <NavigationMenu />
    </IconButton>
  );
};

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
)(muiThemeable()(Header));