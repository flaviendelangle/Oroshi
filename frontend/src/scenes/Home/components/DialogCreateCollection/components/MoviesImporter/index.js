import React, { Component } from 'react'
import { connect } from 'react-redux'
import ScrollArea from 'react-scrollbar'
import { List } from 'material-ui/List'

import Line from './components/Line'
import { importMovies } from './actions'

class MoviesImporter extends Component {
  
  movies = [];
  
  constructor(props) {
    super(props);
    if(props.moviesToImport) {
      this.movies = props.moviesToImport;
    }
  }
  
  componentWillReceiveProps(newProps) {
    if(!this.props.moviesToImport && newProps.moviesToImport) {
      this.props.importMovies(newProps.moviesToImport);
      this.movies = newProps.moviesToImport;
    }
  }
  
  renderLines = () => {
    return this.movies.map(movie => {
      return (<Line data={movie} key={movie.tmdbId} />);
    })
  };
  
  render() {
    return (
      <List>
        <ScrollArea
          speed={0.8}
          horizontal={false}
        >
          {this.renderLines()}
        </ScrollArea>
      </List>
    );
  }
}

const mapStateToProps = state => {
  return {
    moviesToImport: state.home.dialogCreateCollection.moviesImporter.moviesToImport
  }
};

const mapDispatchToProps = dispatch => {
  return {
    importMovies: movies => dispatch(importMovies(dispatch, movies))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviesImporter);