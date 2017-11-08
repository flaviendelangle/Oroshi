import React, {Component} from 'react'
import { connect } from 'react-redux'

import CollectionContent from 'components/CollectionContent'
import Movie from 'components/Movie'
import { TABLE_COLUMNS } from './services/list'


class MoviesData extends Component {
  
  state = {
    query: '',
  };
  
  render() {
    return (
      <CollectionContent
        {...this.props}
        type="movies"
        elementComponent={Movie}
        listColumns={TABLE_COLUMNS}
      />
    )
  }
  
}

const mapStateToProps = state => {
  const root = state.collectionMovies.moviesData;

  return {
    update: root.update,
    content: root.content,
    toShow: root.toShow,
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