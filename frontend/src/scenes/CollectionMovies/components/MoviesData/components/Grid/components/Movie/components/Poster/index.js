import React, { Component } from 'react'

import { path } from '../../../../../../../../../../services/TheMovieDatabaseJS/images'

const defaultPosterStyle = {
  height: 278,
  width: 185,
  fontSize: '1.5em',
};

const spanStyle = {
  width: '90%',
  left: '5%',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
};

class Movie extends Component {
  
  url = () => {
    return path + '/w185' + this.props.path;
  };
  
  render() {
    if(this.props.path) {
      return (
        <img src={this.url()} alt="Poster" />
      );
    } else {
      return (
        <div style={defaultPosterStyle}>
          <span style={spanStyle}>
            {this.props.title}
          </span>
        </div>
      );
    }
  }
  
}

export default Movie;
