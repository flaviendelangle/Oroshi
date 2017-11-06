import React, { Component } from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper';
import ContentAdd from 'material-ui/svg-icons/content/add'

import Poster from './components/Poster'
import { saveMovie } from './actions'

import './style.css'

class Movie extends Component {
  
  state = {
    mouseOver: false
  };
  
  handleMouseHover = mouseOver => {
    this.setState({mouseOver})
  };
  
  renderOverlay = () => {
    if(this.state.mouseOver || true) {
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
            onClick={() => this.props.save(this.props.data)}
          />
        </div>
      )
    }
    return (null);
  };
  
  render() {
    let className = 'not-in-collection';
    if(this.props.data.already_in_collection) {
      className = 'already-in-collection';
    }
    return (
      <div className={'movie-parent ' + className}>
        <div className="movie-container">
          <Paper
            zDepth={3}
            className="movie"
            onMouseEnter={() => this.handleMouseHover(true)}
            onMouseLeave={() => this.handleMouseHover(false)}
          >
            <Poster path={this.props.data.poster_path} title={this.props.data.title} />
            {this.renderOverlay()}
          </Paper>
        </div>
        <div className="title">{this.props.data.title}</div>
      </div>
    );
  }
  
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    save: data => dispatch(saveMovie(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Movie);