import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ActionDone from 'material-ui/svg-icons/action/done'
import muiThemeable from 'material-ui/styles/muiThemeable';

import Poster from './components/Poster';
import Actions from './components/Actions';
import ElementOverlay from 'components/generics/ElementOverlay';
import { date } from 'services/utils';
import { pickElement } from 'services/languages';

import * as _style from './style';
import './style.css'


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
  
  get title() {
    if(this.props.creationMode) {
      return this.props.data.title;
    }
    const language = this.props.collection.title_language;
    return pickElement(this.props.data, 'titles', 'title', language);
  }
  
  get posterPath() {
    if(this.props.creationMode) {
      return this.props.data.poster_path;
    }
    const language = this.props.collection.poster_language;
    return pickElement(this.props.data, 'posters', 'path', language);
  }
  
  handleMouseHover = mouseOver => {
    this.setState({mouseOver})
  };
  
  save = () => {
    if(!this.state.isAdding) {
      this.props.onCreate(this.props.data);
      //this.setState({ isAdding: true });
    }
  };
  
  destroy = () => {
    const data = this.props.creationMode ? this.props.data.local : this.props.data;
    this.props.onDestroy(this.props.collection, data);
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
            <Poster path={this.posterPath} title={this.title} />
            <ElementOverlay
              note={this.props.data.note}
              mouseOver={this.state.mouseOver}
              creation_mode={this.props.creationMode}
              already_in_collection={this.props.data.already_in_collection}
              handleSave={this.save}
              handleDestroy={this.destroy}
            >
            </ElementOverlay>
            <Overlay
              {...this.props}
              mouseOver={this.state.mouseOver}
              handleSave={this.save}
            />
          </Paper>
        </div>
        <Footer
          title={this.title}
          muiTheme={this.props.muiTheme}
          release_date={this.release_date}
        />
      </div>
    );
  }
  
}

const Overlay = ({ mouseOver, creationMode, handleSave, data, collection }) => {
  return null;
  if(mouseOver) {
    let RealOverlay;
    if(creationMode)
      RealOverlay = OverlayCreationMode;
    else
      RealOverlay = OverlayDefaultMode;
    
    return <RealOverlay handleSave={handleSave} data={data} collection={collection}/>
  }
  return (null);
};

const OverlayCreationMode = ({ handleSave, data }) => {
  if(data.already_in_collection) {
    return (
      <div className="overlay">
        <div style={_style.creationIcon}>
          <ActionDone
            color="white"
            className="add-icon"
          />
        </div>
      </div>
    );
  }
  return (
    <div className="overlay">
      <div style={_style.creationIcon}>
        <ContentAdd
          color="white"
          className="add-icon"
          onClick={handleSave}
        />
      </div>
    </div>
  )
};

const OverlayDefaultMode = ({ data, collection }) => (
  <div className="overlay">
    <Link to={'/movies/' + data.tmdbId + '/'}>
      <div className="overlay-main">
      </div>
    </Link>
    <Actions
      data={data}
      collection={collection}
    />
  </div>
);

const Footer = ({ title, muiTheme, release_date }) => (
  <div
    className="title"
    style={{color: muiTheme.palette.textColor}}
  >
    <div>{release_date}</div>
    <div>{title}</div>
  </div>
);

export default muiThemeable()(Movie);