import React, {Component} from 'react'
import { connect } from 'react-redux'
import SearchBar from 'material-ui-search-bar'

import { update } from './actions'

import './style.css'

class Search extends Component {
  
  state = {
    query: ''
  };
  
  search = query => {
    this.setState({ query });
    this.props.filter(query);
  };
  
  getMovieCount = () => {
    return this.props.count + ' movie' + (this.props.count > 1 ? 's' : '');
  };
  
  render() {
    const hintText = this.props.title ? ('Search in ' + this.props.title) : 'Search ...'
    return (
      <div className="search-bar-container">
        <SearchBar
          hintText={hintText}
          onChange={this.search}
          onRequestSearch={() => this.props.filter(this.state.query)}
          value={this.props.query}
        />
        <div className="movie-count">{this.getMovieCount()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const layout = state.collectionMovies.moviesData.layout;
  let count;
  if(layout === 'stream') {
    count = state.collectionMovies.moviesData.stream.getMovieCount();
  } else {
    count = state.collectionMovies.moviesData.toShow.getMovieCount();
  }
  return {
    query: state.collectionMovies.header.search.query,
    count
  };
};

const mapDispatchToProps = dispatch => {
  return {
    filter: query => dispatch(update(query))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);