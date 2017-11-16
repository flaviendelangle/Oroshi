import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ActionDone from 'material-ui/svg-icons/action/done'
import muiThemeable from 'material-ui/styles/muiThemeable';

import Poster from './components/Poster';
import Actions from './components/Actions';
import Grade from 'components/generics/Grade';
import { date } from 'services/utils';

import './style.css'

const gradeStyle = {
  margin: 'auto',
  top: '50%',
  transform: 'translateY(-50%)'
};

const creationIconStyle = {
  height: 80,
  width: 80,
  borderRadius: '50%',
  backgroundColor: '#1DE9B6',
  top: '50%',
  left: 'calc((185px - 80px)/2)',
  transform: 'translateY(-50%)',
  position: 'absolute',
  boxShadow: '6px 6px 10px rgba(0,0,0,0.6)',
  cursor: 'pointer'
};

class Movie extends Component {
  
  state = {
    mouseOver: false,
    isAdding: false
  };
  
  get release_date() {
    if(this.props.creationMode) {
      return date(this.props.data.release_date, date.TMDB_FORMAT, date.YEAR_FORMAT);
    }
    if(Array.isArray(this.props.data.release)) {
      return parseInt(this.props.data.release[0].name, 10);
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
    if(this.state.mouseOver || true) {
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
          />
        </div>
      )
  };
  
  renderOverlayCreationMode = () => {
    if(this.props.data.already_in_collection) {
      return (
        <div className="overlay">
          <div style={creationIconStyle}>
            <ActionDone
              color="white"
              className="add-icon"
              onClick={this.save}
            />
          </div>
        </div>
      );
    }
    return (
      <div className="overlay">
        <div style={creationIconStyle}>
          <ContentAdd
            color="white"
            className="add-icon"
            onClick={this.save}
          />
        </div>
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