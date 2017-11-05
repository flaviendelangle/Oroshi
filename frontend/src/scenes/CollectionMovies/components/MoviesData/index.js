import React, {Component} from 'react'
import { connect } from 'react-redux'
import CircularProgress from 'material-ui/CircularProgress';

import List from './components/List'
import Help from './components/Help'
import Grid from './components/Grid'
import Stream from './components/Stream'

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
          movies={this.props.moviesToShow.results}
          collection={this.props.collection}
          order={this.props.order.default}
        />
      )
    }
    else if(this.props.layout === 'list') {
      return (
        <List
          data={this.props.moviesToShow.results}
          collection={this.props.collection}
        />
      )
    }
    else if(this.props.layout === 'stream') {
      return (
        <Stream
          data={this.props.stream}
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
  const root = state.collectionMovies.moviesData;

  return {
    update: root.update,
    movies: root.movies,
    moviesToShow: root.toShow,
    stream: root.stream,
    collection: root.collection,
    found: root.found,
    loaded: root.loaded,
    layout: root.layout,
    order: root.order
  }
};

const mapDispatchToProps = dispatch => {
  return {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviesData);