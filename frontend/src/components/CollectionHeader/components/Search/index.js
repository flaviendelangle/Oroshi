import React, {Component} from 'react'
import { connect } from 'react-redux'
import SearchBar from 'material-ui-search-bar'

import { getCollectionState } from 'containers/reducer';
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
  
  getElementCount = () => {
    return this.props.count + ' element' + (this.props.count > 1 ? 's' : '');
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
        <div className="element-count">{this.getElementCount()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const root = getCollectionState(state, ownProps.scene);
  const layout = root.main.layout;
  let count;
  if(layout === 'stream') {
    count = root.main.stream.getElementCount();
  } else {
    count = root.main.toShow.getElementCount();
  }
  return {
    query: root.header.search.query,
    count
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    filter: query => dispatch(update(ownProps.scene, query))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);