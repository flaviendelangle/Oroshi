import React, {Component} from 'react'
import { connect } from 'react-redux'
import SearchBar from 'material-ui-search-bar'

import { update } from './actions'

const searchStyle = {
  margin: '8px auto',
  maxWidth: 800,
  width: '90%'
};

const containerStyle = {
  position: 'absolute',
  left: 40,
  right: 0
};

class Search extends Component {
  
  state = {
    query: ''
  };
  
  search = query => {
    this.setState({ query });
    this.props.filter(query);
  };
  
  render() {
    const hintText = this.props.title ? ('Search in ' + this.props.title) : 'Search ...'
    return (
      <div style={containerStyle}>
        <SearchBar
          hintText={hintText}
          onChange={this.search}
          onRequestSearch={() => this.props.filter(this.state.query)}
          style={searchStyle}
          value={this.props.query}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    query: state.collectionMovies.header.search.query
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