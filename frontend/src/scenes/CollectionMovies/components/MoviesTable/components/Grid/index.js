import React, { Component } from 'react'
import { connect } from 'react-redux'
import ScrollArea from 'react-scrollbar'

import Movie from './components/Movie'

import './style.css'

class Grid extends Component {
  
  renderMovies = () => {
    return this.props.movies.map(movie => {
      return (
        <Movie data={movie} key={movie.pk}/>
      );
    })
  };
  
  render() {
    console.log(this.props.movies);
    return (
      <div className="movie-grid-container">
        <ScrollArea
          speed={0.8}
          horizontal={false}
        >
          <div className="movie-grid">
            {this.renderMovies()}
          </div>
        </ScrollArea>
      </div>
    );
  }
  
}

const mapStateToProps = state => {
  return {}
};

const mapDispatchToProps = dispatch => {
  return {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Grid);