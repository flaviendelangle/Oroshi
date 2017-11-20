import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import muiThemeable from 'material-ui/styles/muiThemeable';
import ImageEye from 'material-ui/svg-icons/image/remove-red-eye';

import Poster from './components/Poster';
import ElementOverlay from 'components/generics/ElementOverlay';
import { date } from 'services/utils';
import { pickElement } from 'services/languages';
import { addElement, removeElement } from 'services/actions/collections';
import { switchSeenOnElement } from 'services/actions/collections/movies';

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
  
  get note() {
    if(this.props.creationMode) {
      return this.props.data.vote_average;
    }
    return this.props.data.note;
  }
  
  handleMouseHover = mouseOver => {
    this.setState({mouseOver})
  };
  
  save = () => {
    if(!this.state.isAdding) {
      this.props.create(this.props.data);
      this.setState({ isAdding: true });
    }
  };
  
  destroy = () => {
    const data = this.props.creationMode ? this.props.data.local : this.props.data;
    this.props.destroy(this.props.collection, data);
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
              note={this.note}
              mouseOver={this.state.mouseOver}
              creation_mode={this.props.creationMode}
              already_in_collection={this.props.data.already_in_collection}
              handleSave={this.save}
              handleDestroy={this.destroy}
              topRightAction={
                <Seen
                  creation_mode={this.props.creationMode}
                  seen={this.props.data.seen}
                  handleClick={() => this.props.switchSeen(this.props.data)}
                />
              }
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

const Footer = ({ title, muiTheme, release_date }) => (
  <div
    className="title"
    style={{color: muiTheme.palette.textColor}}
  >
    <div>{release_date}</div>
    <div>{title}</div>
  </div>
);

const Seen = ({ seen, handleClick, creation_mode }) => {
  if(creation_mode) {
    return null;
  }
  const color = seen ? 'green' : 'red';
  return (
    <ImageEye
      style={{color}}
      onClick={handleClick}
    />
  );
};

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
    create: data => dispatch(addElement('movies', data)),
    destroy: (collection, data) => {
      dispatch(removeElement('movies', collection, data))
    },
    switchSeen: data => dispatch(switchSeenOnElement(data))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(muiThemeable()(Movie));
