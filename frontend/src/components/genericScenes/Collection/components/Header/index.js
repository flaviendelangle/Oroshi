import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import ActionSettings from 'material-ui/svg-icons/action/settings';

import Search from './components/Search/index';
import OrderMenu from './components/OrderMenu/index';
import HeaderOriginal from 'components/Header/index';


class Header extends Component {

  get link() {
    return '/collections/' + this.props.scene +
           '/' + this.props.collection + '/settings/';
  }
  
  render() {
    if(!this.props.loaded) {
      return null;
    }
    return (
      <div>
        <DocumentTitle title={this.props.title || 'Loading...'}/>
        <HeaderOriginal>
          <div className="menu">
            <Link to={this.link}>
              <ActionSettings/>
              <div>Collection Settings</div>
            </Link>
          </div>
          <div className="search">
            <Search
              title={this.props.title}
              scene={this.props.scene}
              query={this.props.query}
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
  
  if(!headerRoot) {
    return {
      loaded: false
    };
  }
  const layout = contentRoot.layout;
  let count;
  if(layout === 'stream') {
    count = contentRoot.stream.getElementCount();
  } else {
    count = contentRoot.toShow.getElementCount();
  }
  return {
    loaded: true,
    collection: headerRoot.collection,
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
)(Header);
