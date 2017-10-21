import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ActionSettings from 'material-ui/svg-icons/action/settings'

import HeaderOriginal from '../../../../components/Header'


class Header extends Component {

  render() {
    return (
      <div>
        <HeaderOriginal title={this.props.title}>
          <Link to={'/collections/' + this.props.collection + '/settings/' }>
            <ActionSettings/>
            <div>Collection Settings</div>
          </Link>
        </HeaderOriginal>
      </div>
    );
  }
  
}

const mapStateToProps = state => {
  return {
    collection: state.collectionMovies.header.collection,
    title: state.collectionMovies.header.title
  }
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
