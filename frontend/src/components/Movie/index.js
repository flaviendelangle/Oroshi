import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import ContentAdd from 'material-ui/svg-icons/content/add';
import muiThemeable from 'material-ui/styles/muiThemeable';

import Poster from './components/Poster';
import Actions from './components/Actions';
import Grade from 'components/Grade';
import { date } from 'services/utils';

import './style.css'

const gradeStyle = {
  margin: 'auto',
  top: '50%',
  transform: 'translateY(-50%)',
};

class Movie extends Component {
  
  state = {
    mouseOver: false,
    isAdding: false
  };
  
  get release_date() {
    if(this.props.creationMode) {
      date(this.props.data.release_date, date.TMDB_FORMAT, date.YEAR_FORMAT);
    }
    return this.props.data.release;
  }
  
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
              <Grade
                value={this.props.data.note}
                style={gradeStyle}
              />
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
    return (
      <div
        className="title"
        style={{color: this.props.muiTheme.palette.textColor}}
      >
        <div>{this.release_date}</div>
        <div>{this.props.data.title}</div>
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

export default muiThemeable()(Movie);