import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Paper from 'material-ui/Paper';
import ContentAdd from 'material-ui/svg-icons/content/add'
import StarRatingComponent from 'react-star-rating-component';

import Poster from './components/Poster'
import Actions from './components/Actions'
import { date } from 'services/utils';

import './style.css'

class Movie extends Component {
  
  state = {
    mouseOver: false,
    isAdding: false
  };
  
  handleMouseHover = mouseOver => {
    this.setState({mouseOver})
  };
  
  save = () => {
    if(!this.state.isAdding) {
      this.props.onCreate(this.props.data);
      this.setState({ isAdding: true });
    }
  };
  
  getParentClassName = () => {
    let className = '';
    if(this.props.data.already_in_collection) {
      className = 'already-in-collection';
    } else if(this.props.creationMode) {
      className = 'not-in-collection';
    }
    return className
  };
  
  getPosterPath = () => {
    if(this.props.creationMode) {
      return this.props.data.poster_path;
    }
    return this.props.data.poster;
  };
  
  renderOverlay = () => {
    if(this.state.mouseOver) {
      if(this.props.creationMode) {
        return this.renderOverlayCreationMode();
      }
      return this.renderOverlayDefaultMode();
    }
    return (null);
  };
  
  renderOverlayDefaultMode = () => {
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
          <Actions
            data={this.props.data}
            collection={this.props.collection}
            scene='movies'
          />
        </div>
      )
  };
  
  renderOverlayCreationMode = () => {
    if(this.props.data.already_in_collection) {
      return (
        <div className="overlay">
          ALREADY ADDED
        </div>
      );
    }
    return (
      <div className="overlay">
        <ContentAdd
          color="white"
          className="add-icon"
          onClick={this.save}
        />
      </div>
    )
  };
  
  renderFooter = () => {
    if(!this.props.creationMode) {
      return null;
    }
    const release = date(this.props.data.release_date, date.TMDB_FORMAT, date.YEAR_FORMAT);
    return (
      <div className="title">
        {release + ' - ' + this.props.data.title}
      </div>
    );
  };
  
  render() {
    return (
      <div className={'movie-parent ' + this.getParentClassName()}>
        <div className="movie-container">
          <Paper
            zDepth={3}
            className="movie"
            onMouseEnter={() => this.handleMouseHover(true)}
            onMouseLeave={() => this.handleMouseHover(false)}
          >
            <Poster path={this.getPosterPath()} title={this.props.data.title} />
            {this.renderOverlay()}
          </Paper>
        </div>
        {this.renderFooter()}
      </div>
    );
  }
  
}

export default Movie;