import React, { Component } from 'react';

import CollectionScene from 'components/genericScenes/Collection';
import Movie from 'components/Movie';
import { TABLE_COLUMNS } from './services/list';

class CollectionMovies extends Component {
  
  config = {
    listColumns: TABLE_COLUMNS,
    elementComponent: Movie
  };
  
  render() {
    return (
      <CollectionScene
        {...this.props}
        config={this.config}
        scene="movies"
      />
    );
  };
  
}

export default CollectionMovies;