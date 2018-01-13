import React, {Component} from 'react';
import { connect } from 'react-redux';

import SearchBar from 'material-ui-search-bar';
import AutoComplete from 'material-ui/AutoComplete';
import muiThemeable from 'material-ui/styles/muiThemeable';

import { update } from './actions'
import { search, getRecommendations } from 'services/actions/publicAPI';

import './style.css';


class Search extends Component {
  
  state = {
    query: ''
  };
  
  get hintText() {
    if (this.props.isAdding) {
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
  
  renderCounter = _ => {
    const { isAdding, count, muiTheme: { palette }} = this.props;
    if (isAdding) {
      return null;
    }
    const style = { color: palette.alternateTextColor };
    return (
      <div className="element-count" style={style}>
        {`${count} element${(count > 1 ? 's' : '')}`}
        </div>
    );
  };
  
  render() {
    const { query, autoComplete } = this.props;
    return (
      <div className="search-bar-container">
        <SearchBar
          hintText={this.hintText}
          onChange={this.search}
          onRequestSearch={_ => this.filter(this.state.query, true)}
          value={query}
          dataSource={autoComplete}
          filter={AutoComplete.caseInsensitiveFilter}
          maxSearchResults={10}
        />
        {this.renderCounter()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    filter: (query, forced, isAdding, collection) => {
      dispatch(update(ownProps.scene, query));
      if (isAdding && forced) {
        if (query === '') {
          dispatch(getRecommendations(ownProps.scene, collection));
        } else {
          dispatch(search(ownProps.scene, collection, query));
        }
      }
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(muiThemeable()(Search));