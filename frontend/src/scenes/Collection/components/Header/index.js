import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DocumentTitle from 'react-document-title';

import ActionSettings from 'material-ui/svg-icons/action/settings';
import muiThemeable from 'material-ui/styles/muiThemeable';

import Search from './components/Search/index';
import OrderMenu from './components/OrderMenu/index';
import HeaderOriginal from 'components/generics/Header/index';


class Header extends Component {

  get link() {
    const { scene, collection } = this.props;
    return `/collections/${scene}/${collection.pk}/settings/`;
  }
  
  get autoComplete() {
    const { isAdding, layout, autoComplete } = this.props;
    if (isAdding) {
      return [];
    }
    if (layout === 'stream') {
      return autoComplete.stream;
    }
    return autoComplete.grid;
  }
  
  render() {
    const {
      loaded,
      found,
      title,
      scene,
      query,
      count,
      isAdding,
      collection,
      muiTheme,
      isPublic,
    } = this.props;
    if (!loaded || !found) {
      return (
        <DocumentTitle title='Loading...' />
      );
    }
    const style = {
      color: muiTheme.palette.alternateTextColor
    };
    return (
      <div>
        <DocumentTitle title={title}/>
        <HeaderOriginal
          title={title}
          isPublic={isPublic}
          showTitle={false}
        >
          <div className="menu">
            <Link to={this.link}>
              <ActionSettings style={style}/>
              <div>Collection Settings</div>
            </Link>
          </div>
          <div className="search">
            <Search
              title={title}
              scene={scene}
              query={query}
              count={count}
              isAdding={isAdding}
              collection={collection}
              autoComplete={this.autoComplete}
            />
          </div>
          <div className="actions">
            <OrderMenu scene={scene}/>
          </div>
        </HeaderOriginal>
      </div>
    );
  }
  
}

const mapStateToProps = (state, ownProps) => {
  const contentRoot = state.collections.content[ownProps.scene];
  const headerRoot = state.collections.header[ownProps.scene];
  const root = state.collections.main[ownProps.scene];
  
  if (!headerRoot) {
    return {
      loaded: false
    };
  }
  const layout = contentRoot.layout;
  let count;
  if (layout === 'stream') {
    count = contentRoot.stream.getElementCount();
  } else {
    count = contentRoot.grid.getElementCount();
  }

  return {
    isAdding: root.isAdding,
    
    loaded: contentRoot.loaded,
    found: contentRoot.found,
    layout: contentRoot.layout,
    collection: contentRoot.collection,
    autoComplete: contentRoot.autoComplete,
    
    title: headerRoot.title,
    query: headerRoot.query,
    
    count
  }
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(muiThemeable()(Header));
