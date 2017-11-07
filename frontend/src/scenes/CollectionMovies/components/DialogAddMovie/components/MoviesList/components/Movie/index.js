import React, { Component } from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper';
import ContentAdd from 'material-ui/svg-icons/content/add'

import Poster from './components/Poster'
import { saveMovie } from './actions'
import { date } from '../../../../../../../../services/utils';

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
      this.props.save(this.props.data);
      this.setState({ isAdding: true });
    }
  };
  
  renderOverlay = () => {
    if(this.state.mouseOver) {
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
    }
    return (null);
  };
  
  render() {
    const release = date(this.props.data.release_date, date.TMDB_FORMAT, date.YEAR_FORMAT);
    let className = 'not-in-collection';
    if(this.props.data.already_in_collection) {
      className = 'already-in-collection';
    }
    console.log(this.props.data);
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
        <div className="title">
          {release + ' - ' + this.props.data.title}
        </div>
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