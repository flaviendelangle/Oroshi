import React, { Component } from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import muiThemeable from 'material-ui/styles/muiThemeable';
import ImageEye from 'material-ui/svg-icons/image/remove-red-eye';

import Poster from './components/Poster';
import ElementOverlay from 'components/generics/ElementOverlay';
import { addElement, removeElement } from 'services/actions/collections';
import { switchSeenOnElement } from 'services/actions/collections/movies';

import './style.css'

/** Class representing a movie frame, used mainly in the layouts (Grid + Stream) */
class Movie extends Component {
  
  state = {
    isMouseOver: false,
    isAdding: false,
    isReady: false
  };
  
  get release_date() {
    return this.props.data.getReleaseDate();
  }
  
  get title() {
    return this.props.data.getTitle();
  }
  
  get posterPath() {
    return this.props.data.getPosterPath();
  }
  
  get note() {
    return this.props.data.getNote();
  }
  
  get parentClassName() {
    let className = '';
    if (this.props.data.isInCollection()) {
      className = 'already-in-collection';
    } else if (this.props.creationMode) {
      className = 'not-in-collection';
    }
    if(this.state.isReady) {
      className += ' ready';
    }
    return className
  };
  
  /**
   * Update state.mouseOver to decide if we want to generate the Overlay
   * @param {boolean} isMouseOver
   */
  handleMouseHover = isMouseOver => {
    this.setState({ isMouseOver })
  };
  
  handlePosterLoad = () => {
    this.setState({ isReady: true });
  };
  
  /**
   * Add the movie into the collection
   */
  save = () => {
    if (!this.state.isAdding) {
      this.props.create(this.props.collection, this.props.data);
      this.setState({ isAdding: true });
    }
  };
  
  /**
   * Remove the movie from the collection
   */
  destroy = () => {
    this.props.destroy(this.props.collection, this.props.data);
  };
  
  componentWillReceiveProps(newProps) {
    if (this.props.data.isInCollection() !== newProps.data.isInCollection()) {
      this.setState({ isAdding: false });
    }
  }

  render() {
    return (
      <div className={'movie-parent ' + this.parentClassName}>
        <div className="movie-container">
          <Paper
            zDepth={3}
            className="movie"
            onMouseEnter={() => this.handleMouseHover(true)}
            onMouseLeave={() => setTimeout(() => this.handleMouseHover(false), 300)}
          >
            <Poster
              path={this.posterPath}
              title={this.title}
              onLoad={this.handlePosterLoad}
            />
            <ElementOverlay
              note={this.note}
              mouseOver={this.state.isMouseOver}
              creation_mode={this.props.creationMode}
              already_in_collection={this.props.data.isInCollection()}
              handleSave={this.save}
              handleDestroy={this.destroy}
              topRightAction={
                <Seen
                  creation_mode={this.props.creationMode}
                  seen={this.props.data.hasBeenSeen()}
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
  if (creation_mode) {
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
    create: (collection, element) => {
      dispatch(addElement('movies', collection, element));
    },
    destroy: (collection, element) => {
      dispatch(removeElement('movies', collection, element));
    },
    switchSeen: data => dispatch(switchSeenOnElement(data))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(muiThemeable()(Movie));
