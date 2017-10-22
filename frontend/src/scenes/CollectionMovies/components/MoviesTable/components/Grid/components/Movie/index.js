import React, { Component } from 'react'
import Paper from 'material-ui/Paper';
import StarRatingComponent from 'react-star-rating-component';

import { path } from '../../../../../../../../services/TheMovieDatabaseJS/images'

import './style.css'

class Movie extends Component {
  
  url = (poster) => {
    return path + '/w185' + poster;
  };
  
  render() {
    return (
      <Paper zDepth={3} className="movie">
        <img src={this.url(this.props.data.poster)}  alt="Poster"/>
        <div className="overlay">
          <div className="title">{this.props.data.title}</div>
          <div className="note">
            <StarRatingComponent
              name={"Rate " + this.props.data.title}
              starCount={10}
              value={this.props.data.note}
              editing={false}
            />
          </div>
        </div>
      </Paper>
    );
  }
  
}

export default Movie;