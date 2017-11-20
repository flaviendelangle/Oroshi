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


class Movie extends Component {
  
  state = {
    mouseOver: false,
    isAdding: false
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
  
  componentWillReceiveProps(newProps) {
    if(this.props.data.already_in_collection !== newProps.data.already_in_collection) {
      this.setState({ isAdding: false });
    }
  }

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
