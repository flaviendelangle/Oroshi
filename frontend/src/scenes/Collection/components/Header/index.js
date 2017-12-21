import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DocumentTitle from 'react-document-title';

import ActionSettings from 'material-ui/svg-icons/action/settings';
import muiThemeable from 'material-ui/styles/muiThemeable';

import Search from './components/Search/index';
import OrderMenu from './components/OrderMenu/index';
import HeaderOriginal from 'components/Header/index';


class Header extends Component {

  get link() {
    return '/collections/' + this.props.scene +
           '/' + this.props.collection.pk + '/settings/';
  }
  
  get autoComplete() {
    if (this.props.isAdding) {
      return [];
    }
    if (this.props.layout === 'stream') {
      return this.props.autoComplete.stream;
    }
    return this.props.autoComplete.grid;
  }
  
  render() {
    if (!this.props.loaded || !this.props.found) {
      return (
        <DocumentTitle title='Loading...' />
      );
    }
    const style = { color: this.props.muiTheme.palette.alternateTextColor };
    return (
      <div>
        <DocumentTitle title={this.props.title}/>
        <HeaderOriginal title={this.props.title} showTitle={false}>
          <div className="menu">
            <Link to={this.link}>
              <ActionSettings style={style}/>
              <div>Collection Settings</div>
            </Link>
          </div>
          <div className="search">
            <Search
              title={this.props.title}
              scene={this.props.scene}
              query={this.props.query}
              count={this.props.count}
              isAdding={this.props.isAdding}
              collection={this.props.collection}
              autoComplete={this.autoComplete}
            />
          </div>
          <div className="actions">
            <OrderMenu scene={this.props.scene}/>
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
