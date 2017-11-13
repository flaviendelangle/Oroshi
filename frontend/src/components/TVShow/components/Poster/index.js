import React, { Component } from 'react'

import { path } from 'services/TheMovieDatabaseJS/images'

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

class Poster extends Component {
  
  url = () => {
    return path + '/w185' + this.props.path;
  };
  
  showProps = img => {
    setTimeout(() => {
      if(!img) {
        return false;
      }
      console.log(this.props.title, img.offsetHeight);
    }, 2000);
  };
  
  render() {
    if(this.props.path) {
      return (
        <img src={this.url()} alt="Poster" ref={this.showProps} />
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

export default Poster;
