import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import ContentCreate from 'material-ui/svg-icons/content/create';
import Identicon from 'components/Identicon'


import './style.css';

class CollectionBox extends Component {
  
  url = () => {
    let baseURL = '/collections/' + this.props.data.pk;
    if(this.props.editing) {
      return baseURL + '/settings/';
    }
    else if(this.props.data.type === 'movies') {
      return baseURL + '/movies/';
    }
    else if(this.props.data.type === 'tv_shows') {
      return baseURL + '/tv_shows/';
    }
  };
  
  render() {
    return (null);
    return (
      <Link to={this.url()}>
        <div className="collection-box">
          <div className="collection-icon">
            <div className={ 'collection-editing-mask ' + (this.props.editing ? '' : 'invisible') } >
              <ContentCreate color="white" className="editing-icon" />
            </div>
            <Identicon size="200" string={this.props.data.title}/>
          </div>
          <div className="collection-title">{this.props.data.title}</div>
        </div>
      </Link>
    )
  }
}

const mapStateToProps = state => {
  return {
  }
};

const mapDispatchToProps = dispatch => {
  return {
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionBox);