import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DocumentTitle from 'react-document-title';

import ActionSettings from 'material-ui/svg-icons/action/settings';
import muiThemeable from 'material-ui/styles/muiThemeable';

import Search from './components/Search/index';
import OrderMenu from './components/OrderMenu/index';
import HeaderOriginal from 'components/generics/Header/index';
import { connect } from 'services/redux';


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
            <OrderMenu scene={scene} collection={collection} />
          </div>
        </HeaderOriginal>
      </div>
    );
  }
  
}

const mapStateToProps = ({ main, content, header }) => {
  const layout = content.layout;
  let count;
  if (layout === 'stream') {
    count = content.stream.getElementCount();
  } else {
    count = content.grid.getElementCount();
  }

  return {
    isAdding: main.isAdding,
    
    loaded: content.loaded,
    found: content.found,
    layout: content.layout,
    collection: content.collection,
    autoComplete: content.autoComplete,
    
    title: header.title,
    query: header.query,
    
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
