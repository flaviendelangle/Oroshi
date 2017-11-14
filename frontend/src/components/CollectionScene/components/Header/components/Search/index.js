import React, {Component} from 'react'
import { connect } from 'react-redux'
import SearchBar from 'material-ui-search-bar'

import { getCollectionState } from 'containers/reducer';
import { update } from './actions'
import { search } from 'services/actions/publicAPI'

import './style.css'

class Search extends Component {
  
  state = {
    query: ''
  };
  
  get hintText() {
    if(this.props.isAdding) {
      return 'Search for content to add';
    }
    return this.props.title ? ('Search in ' + this.props.title) : 'Search ...';
  }
  
  search = query => {
    this.setState({ query });
    this.filter(query, false)
  };
  
  filter = (query, forced) => {
    this.props.filter(query, forced, this.props.isAdding, this.props.collection);
  };
  
  renderCounter = () => {
    if(this.props.isAdding) {
      return null;
    }
    const count = this.props.count + ' element' + (this.props.count > 1 ? 's' : '');
    return (
      <div className="element-count">{count}</div>
    );
  };
  
  render() {
    return (
      <div className="search-bar-container">
        <SearchBar
          hintText={this.hintText}
          onChange={this.search}
          onRequestSearch={() => this.filter(this.state.query, true)}
          value={this.props.query}
        />
        {this.renderCounter()}
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
    isAdding: root.main.isAdding,
    collection: root.main.collection,
    count
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    filter: (query, forced, isAdding, collection) => {
      dispatch(update(ownProps.scene, query));
      if(isAdding && forced) {
        dispatch(search(ownProps.scene, collection, query));
      }
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);