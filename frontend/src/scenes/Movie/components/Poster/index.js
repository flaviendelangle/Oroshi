import React, { Component } from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';

import { path } from '../../../../services/TheMovieDatabaseJS/images'
import './style.css'

class Poster extends Component {

  url = (poster) => {
    return path + '/w185' + poster.file_path;
  };
  
  cadreContent = () => {
    if(this.props.posters === null) {
      return (<CircularProgress className="progress" />);
    }
    if(this.props.posters.length === 0) {
      return (
        <div className="empty">
        </div>
      );
    }
    return (<img src={this.url(this.props.posters[0])}  alt="Poster"/>);
  };
  
  render() {
    return (
      <Paper className="movie-poster" zDepth={3}>
        {this.cadreContent()}
      </Paper>
    );
    
  }
  
}

const mapStateToProps = state => {
  return {
    posters: state.movie.poster.posters
  }
};

const mapDispatchToProps = dispatch => {
  return {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Poster);