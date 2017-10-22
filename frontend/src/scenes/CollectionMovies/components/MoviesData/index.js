import React, {Component} from 'react'
import { connect } from 'react-redux'
import CircularProgress from 'material-ui/CircularProgress';

import List from './components/List'
import Help from './components/Help'
import Grid from './components/Grid'
import Search from './services/search'

const progressStyle = {
  width: 40,
  height: 40,
  position: 'absolute',
  left: 'calc(50% - 20px)',
  top: 'calc(50% - 20px)',
};

const pageStyle = {
  position: 'fixed',
  top: 64,
  bottom: 0,
  right: 0,
  left: 0
};

const containerStyle = {
  position: 'relative',
  height: '100%'
};

class MoviesData extends Component {
  
  state = {
    query: '',
  };
  
  renderContent = () => {
    if(this.props.layout === 'grid') {
      return (
        <Grid
          movies={this.props.moviesToShow}
        />
      )
    }
    else {
      return (
        <List
          data={this.props.moviesToShow}
          collection={this.props.collection}
        />
      )
    }
  };
  
  render() {
    if(!this.props.loaded) {
      return (
        <div style={progressStyle}>
          <CircularProgress />
        </div>
      );
    }
    else if(!this.props.found) {
      return (<div>Not found</div>)
    }
    else if(this.props.movies.length === 0) {
      return (<Help/>)
    }
    else {
      return (
        <div style={pageStyle}>
          <div style={containerStyle}>
            {this.renderContent()}
          </div>
        </div>
      );
    }
  }
  
}

const mapStateToProps = state => {
  const moviesToShow = new Search(
    state.collectionMovies.moviesData.movies,
    state.collectionMovies.moviesData.query
    ).results;
  
  return {
    update: state.collectionMovies.moviesData.update,
    movies: state.collectionMovies.moviesData.movies,
    moviesToShow,
    collection: state.collectionMovies.moviesData.collection,
    found: state.collectionMovies.moviesData.found,
    loaded: state.collectionMovies.moviesData.loaded,
    layout: state.collectionMovies.moviesData.layout
  }
};

const mapDispatchToProps = dispatch => {
  return {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviesData);