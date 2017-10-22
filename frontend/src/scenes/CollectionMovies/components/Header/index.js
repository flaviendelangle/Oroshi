import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import ActionSettings from 'material-ui/svg-icons/action/settings'

import Search from './components/Search'
import OrderMenu from './components/OrderMenu'
import HeaderOriginal from '../../../../components/Header'


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
            <Search title={this.props.title}/>
          </div>
          <div className="actions">
            <OrderMenu/>
          </div>
        </HeaderOriginal>
      </div>
    );
  }
  
}

const mapStateToProps = state => {
  return {
    collection: state.collectionMovies.header.main.collection,
    title: state.collectionMovies.header.main.title
  }
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
