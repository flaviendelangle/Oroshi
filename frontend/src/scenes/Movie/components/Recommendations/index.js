import React, { Component } from 'react'
import { connect } from 'react-redux'
import ScrollArea from 'react-scrollbar'

import { path } from '../../../../services/TheMovieDatabaseJS/images'

const containerStyle = {
  height: 128,
  overflowY: 'hidden',
  whiteSpace: 'nowrap',
  width: '90%',
  margin: '30px auto 0 auto'
};

const movieStyle = {
  display: 'inline-block',
  padding: 10,
};

class Recommendations extends Component {
  
  url = (poster) => {
    return path + '/w185' + poster;
  };
  
  renderRecommendations = () => {
    if(!this.props.movies.results) {
      return (null);
    }
    return this.props.movies.results.map(el => {
      return (
        <div style={movieStyle} key={el.id}>
          <img src={this.url(el.backdrop_path)}  alt="Poster"/>
        </div>
      );
    });
  };
  
  render() {
    return (
      <div style={containerStyle}>
        <ScrollArea
          speed={0.8}
          vertical={false}
        >
          <div>
            {this.renderRecommendations()}
          </div>
        </ScrollArea>
      </div>
    );
    
  }
  
}

const mapStateToProps = state => {
  return {
    movies: state.movie.recommendations.movies
  }
};

const mapDispatchToProps = dispatch => {
  return {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recommendations);