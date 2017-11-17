import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ActionDone from 'material-ui/svg-icons/action/done'
import muiThemeable from 'material-ui/styles/muiThemeable';

import Poster from './components/Poster';
import Actions from './components/Actions';
import Grade from 'components/generics/Grade';

import './style.css'

import * as _style from './style';


class TVShow extends Component {
  
  state = {
    mouseOver: false,
    isAdding: false
  };
  
  get title() {
    if(this.props.creationMode) {
      return this.props.data.name;
    }
    return this.props.data.title;
  }
  
  get poster() {
    if(this.props.creationMode) {
      return this.props.data.poster_path;
    }
    return this.props.data.poster;
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
  
  render() {
    return (
      <div className={'tv-show-parent ' + this.getParentClassName()}>
        <div className="tv-show-container">
          <Paper
            zDepth={3}
            className="tv-show"
            onMouseEnter={() => this.handleMouseHover(true)}
            onMouseLeave={() => this.handleMouseHover(false)}
          >
            <Poster path={this.poster} title={this.props.data.title} />
            <Overlay
              {...this.props}
              mouseOver={this.state.mouseOver}
              handleSave={this.save}
            />
          </Paper>
        </div>
        <Footer muiTheme={this.props.muiTheme} title={this.title} />
      </div>
    );
  }
  
}

const Overlay = ({ mouseOver, creationMode, handleSave, data, collection }) => {
  if(mouseOver) {
    let RealOverlay;
    if(creationMode)
      RealOverlay = OverlayCreationMode;
    else
      RealOverlay = OverlayDefaultMode;
    
    return <RealOverlay onSave={handleSave} data={data} collection={collection}/>
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
    <Link to={'/tv_shows/' + data.tmdbId + '/'}>
      <div className="overlay-main">
        <Grade
          value={data.note}
          style={_style.grade}
        />
      </div>
    </Link>
    <Actions
      data={data}
      collection={collection}
    />
  </div>
);

const Footer = ({ muiTheme, title }) => (
  <div
    className="title"
    style={{color: muiTheme.palette.textColor}}
  >
    <div>{title}</div>
  </div>
);

export default muiThemeable()(TVShow);