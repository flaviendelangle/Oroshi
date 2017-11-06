import React, { Component } from 'react'
import { connect } from 'react-redux'
import ScrollArea from 'react-scrollbar'
import { List } from 'material-ui/List'

import Line from './components/Line'
import Progress from './components/Progress'
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
      <div>
        <Progress progress={this.props.progress} />
        <List>
          <ScrollArea
            speed={0.8}
            horizontal={false}
          >
            {this.renderLines()}
          </ScrollArea>
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const root = state.home.dialogCreateCollection.moviesImporter;
  return {
    moviesToImport: root.moviesToImport,
    progress: root.progress
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