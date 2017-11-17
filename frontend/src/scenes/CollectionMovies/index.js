import React from 'react';

import CollectionScene from 'components/genericScenes/Collection';
import Movie from 'components/Movie';
import { TABLE_COLUMNS } from './services/list';


const config = {
  listColumns: TABLE_COLUMNS,
  elementComponent: Movie
};

const CollectionMovies = props => (
  <CollectionScene
    {...props}
    config={config}
    scene="movies"
  />
);

export default CollectionMovies;