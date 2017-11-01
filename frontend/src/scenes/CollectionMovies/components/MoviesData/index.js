import React, {Component} from 'react'
import { connect } from 'react-redux'
import CircularProgress from 'material-ui/CircularProgress';

import List from './components/List'
import Help from './components/Help'
import Grid from './components/Grid'
import Stream from './components/Stream'
import Search from './services/search'
import StreamGenerator from './services/streamgenerator'

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
          collection={this.props.collection}
          order={this.props.order}
        />
      )
    }
    else if(this.props.layout === 'list') {
      return (
        <List
          data={this.props.moviesToShow}
          collection={this.props.collection}
        />
      )
    }
    else if(this.props.layout === 'stream') {
      return (
        <Stream
          data={this.props.stream}
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
  
  const stream = new StreamGenerator(
    state.collectionMovies.moviesData.movies,
    state.collectionMovies.moviesData.query,
    { field: 'directors', direction: 'asc' }
  ).results;
  
  return {
    update: state.collectionMovies.moviesData.update,
    movies: state.collectionMovies.moviesData.movies,
    moviesToShow,
    stream,
    collection: state.collectionMovies.moviesData.collection,
    found: state.collectionMovies.moviesData.found,
    loaded: state.collectionMovies.moviesData.loaded,
    layout: state.collectionMovies.moviesData.layout,
    order: state.collectionMovies.moviesData.order
  }
};

const mapDispatchToProps = dispatch => {
  return {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviesData);