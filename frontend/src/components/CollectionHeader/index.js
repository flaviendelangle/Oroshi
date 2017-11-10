import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import ActionSettings from 'material-ui/svg-icons/action/settings';

import { getCollectionState } from 'containers/reducer';
import Search from './components/Search/index';
import OrderMenu from './components/OrderMenu/index';
import HeaderOriginal from 'components/Header/index';


class Header extends Component {

  render() {
    return (
      <div>
        <DocumentTitle title={this.props.title || 'Loading...'}/>
        <HeaderOriginal>
          <div className="menu">
            <Link to={'/collections/' + this.props.collection + '/settings/' }>
              <ActionSettings/>
              <div>Collection Settings</div>
            </Link>
          </div>
          <div className="search">
            <Search
              title={this.props.title}
              scene={this.props.scene}
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
  const root = getCollectionState(state, ownProps.scene).header.main;
  return {
    collection: root.collection,
    title: root.title
  }
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
