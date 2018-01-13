import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Paper from 'material-ui/Paper';
import muiThemeable from 'material-ui/styles/muiThemeable';
import ImageEye from 'material-ui/svg-icons/image/remove-red-eye';
import ContentAdd from 'material-ui/svg-icons/content/add';

import cx from 'classnames'

import Poster from 'components/generics/Poster/index';
import ElementOverlay from 'components/generics/ElementOverlay/index';
import { addElement, removeElement } from 'services/actions/collections';
import { switchSeenOnElement } from 'types/movies/actions';
import { publicRoot } from 'services/TheMovieDatabaseJS/movies';
import date from 'services/content/date';

import './style.css'


/** Class representing a movie frame, used mainly in the layouts (Grid + Stream) */
class Movie extends Component {
  
  state = {
    isMouseOver: false,
    isAdding: false,
    isReady: false
  };
  
  layout = {
    title: {
      label: 'Title'
    },
    year: {
      label: 'Year of release'
    },
    grade: {
      label: 'Public grade'
    },
    seen: {
      label: 'Have you seen it ?'
    },
    add: {
      label: 'Add to collection'
    }
  };
  
  get release_date() {
    return date(this.props.data.getReleaseDate(), date.TMDB_FORMAT, date.YEAR_FORMAT);
  }
  
  getParentClasses = () => {
    const { data, creationMode } = this.props;
    const { isReady } = this.state;
    return cx({
      'movie-parent': true,
      'already-in-collection': (data.isInCollection() && creationMode),
      'not-in-collection': (!data.isInCollection() && creationMode),
      'ready': isReady,
    })
  };
  
  /**
   * Update state.mouseOver to decide if we want to generate the Overlay
   * @param {boolean} isMouseOver
   */
  handleMouseHover = isMouseOver => {
    this.setState({ isMouseOver })
  };
  
  handlePosterLoad = _ => {
    this.setState({ isReady: true });
  };
  
  /**
   * Check if we are in test mode
   */
  isTesting = _ => {
    return this.props.mode === 'test';
  };
  
  addToLayout = (key, element) => {
    this.layout[key].element = element
  };
  
  /**
   * Add the movie into the collection
   */
  save = _ => {
    if (!this.state.isAdding) {
      this.props.create(this.props.collection, this.props.data);
      this.setState({ isAdding: true });
    }
  };
  
  /**
   * Remove the movie from the collection
   */
  destroy = _ => {
    this.props.destroy(this.props.collection, this.props.data);
  };
  
  /**
   * Switch the seen paramter of the movie
   */
  switchSeen = _ => {
    if(this.isTesting()) {
      return null;
    }
    this.props.switchSeen(this.props.data);
  };
  
  componentWillReceiveProps(newProps) {
    const { data } = this.props;
    if (data.isInCollection() !== newProps.data.isInCollection()) {
      this.setState({ isAdding: false });
    }
  }
  
  componentDidUpdate() {
    const { onRender } = this.props;
    if(onRender) {
      onRender({
        layout: this.layout
      });
    }
  }

  render() {
    const { style, creationMode, isPublic, mode, collection, data, muiTheme } = this.props;
    const { isMouseOver } = this.state;
    return (
      <div className={this.getParentClasses()} style={style}>
        <div className="movie-container">
          <Paper
            zDepth={3}
            className="movie"
            onMouseEnter={_ => this.handleMouseHover(true)}
            onMouseLeave={_ => this.handleMouseHover(false)}
          >
            <Poster
              path={data.getPosterPath()}
              title={data.getTitle()}
              onLoad={this.handlePosterLoad}
            />
            <ElementOverlay
              mode={mode}
              addToLayout={this.addToLayout}
              note={data.getNote()}
              mouseOver={isMouseOver}
              creation_mode={creationMode}
              already_in_collection={data.isInCollection()}
              handleSave={this.save}
              handleDestroy={this.destroy}
              isPublic={isPublic}
              topRightAction={
                <Seen
                  creation_mode={creationMode}
                  seen={data.hasBeenSeen()}
                  handleClick={_ => this.switchSeen()}
                  addToLayout={this.addToLayout}
                />
              }
              topLeftAction={
                <Suggestions
                  creation_mode={creationMode}
                  addToLayout={this.addToLayout}
                  collection={collection}
                  data={data}
                  isPublic={isPublic}
                />
              }
            />
          </Paper>
        </div>
        <Footer
          title={data.getTitle()}
          tmdbId={data.getPublicId()}
          muiTheme={muiTheme}
          release_date={this.release_date}
          addToLayout={this.addToLayout}
        />
      </div>
    );
  }
  
}

const Footer = ({ title, tmdbId, muiTheme, release_date, addToLayout }) => (
  <div
    className="title"
    style={{color: muiTheme.palette.textColor}}
  >
    <div ref={el => addToLayout('year', el)}>{release_date}</div>
    <Link
      to={publicRoot + tmdbId}
      target="_blank"
      ref={el => addToLayout('title', el)}
    >
      {title}
      </Link>
  </div>
);

const Seen = ({ seen, handleClick, creation_mode, addToLayout }) => {
  if (creation_mode) {
    return null;
  }
  const color = seen ? 'green' : 'red';
  return (
    <ImageEye
      style={{color}}
      onClick={handleClick}
      ref={el => addToLayout('seen', el)}
    />
  );
};

const Suggestions = ({ creation_mode, addToLayout, collection, data, isPublic }) => {
  if (creation_mode || isPublic) {
    return null;
  }
  const url = `/collections/movies/${collection.pk}/suggestions/${data.getPublicId()}/`;
  return (
    <Link to={url}>
      <ContentAdd
        ref={el => addToLayout('seen', el)}
      />
    </Link>
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
