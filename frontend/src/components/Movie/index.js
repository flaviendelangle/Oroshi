import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Paper from 'material-ui/Paper';
import StarRatingComponent from 'react-star-rating-component';

import Poster from './components/Poster'
import Actions from './components/Actions'

import './style.css'

class Movie extends Component {
  
  state = {
    mouseOver: false
  };
  
  handleMouseHover = mouseOver => {
    this.setState({mouseOver})
  };
  
  renderOverlay = () => {
    if(this.state.mouseOver) {
      return (
        <div className="overlay">
          <Link to={'/movies/' + this.props.data.tmdbId + '/'}>
            <div className="overlay-main">
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
          </Link>
          <Actions data={this.props.data} collection={this.props.collection} type='collection_movies'/>
        </div>
      )
    }
    return (null);
  };
  
  render() {
    return (
      <div className="movie-container">
        <Paper
          zDepth={3}
          className="movie"
          onMouseEnter={() => this.handleMouseHover(true)}
          onMouseLeave={() => this.handleMouseHover(false)}
        >
          <Poster path={this.props.data.poster} title={this.props.data.title} />
          {this.renderOverlay()}
        </Paper>
      </div>
    );
  }
  
}

export default Movie;