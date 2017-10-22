import React, {Component} from 'react'
import { connect } from 'react-redux'
import SearchBar from 'material-ui-search-bar'

import { update } from './actions'

const searchStyle = {
  margin: '20px auto 20px auto',
  maxWidth: 800
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
    return (
      <SearchBar
        onChange={this.search}
        onRequestSearch={() => this.props.filter(this.state.query)}
        style={searchStyle}
      />
    );
  }
}

const mapStateToProps = state => {
  return {}
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