import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import AVMovie from 'material-ui/svg-icons/av/movie'

import HeaderOriginal from 'components/Header'


class Header extends Component {

  render() {
    return (
      <div>
        <HeaderOriginal title={this.props.title}>
          <div className="menu">
            <Link to={'/collections/' + this.props.collection + '/movies/' }>
              <AVMovie/>
              <div>Return to my collection</div>
            </Link>
          </div>
        </HeaderOriginal>
      </div>
    );
  }
  
}

const mapStateToProps = state => {
  return {
    collection: state.collectionSettings.header.collection,
    title: state.collectionSettings.header.title
  }
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
