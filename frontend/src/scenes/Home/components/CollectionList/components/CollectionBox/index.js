import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AVMovie from 'material-ui/svg-icons/av/movie';
import HardwareTV from 'material-ui/svg-icons/hardware/tv';
import muiThemeable from 'material-ui/styles/muiThemeable';

import ContentCreate from 'material-ui/svg-icons/content/create';
import Identicon from 'components/generics/Identicon';


import './style.css';

class CollectionBox extends Component {
  
  get url() {
    const { data, editing } = this.props;
    let baseURL = '/collections/';
    if (data.type === 'movies') {
      baseURL += 'movies/';
    }
    else if (data.type === 'tv_shows') {
      baseURL += 'tv_shows/';
    }
    baseURL += data.pk + '/';
    if (editing) {
      baseURL += 'settings/';
    }
    return baseURL;
  }
  
  render() {
    const { data, editing, muiTheme: { palette }} = this.props;
    const Icon = data.type === 'movies' ? AVMovie : HardwareTV;
    return (
      <Link to={this.url}>
        <div className="collection-box">
          <div className="collection-icon" style={{background: palette.primary2Color}}>
            <div className={ 'collection-editing-mask ' + (editing ? '' : 'invisible') } >
              <ContentCreate color={palette.primary1Color} className="editing-icon" />
            </div>
            <Identicon size="190" string={data.title}/>
            <div className="collection-type">
              <Icon/>
            </div>
          </div>
          <div
            className="collection-title"
            style={{color: palette.titleColor}}
          >
            {data.title}
          </div>
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
)(muiThemeable()(CollectionBox));