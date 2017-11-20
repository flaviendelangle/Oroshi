import React from 'react';

import CollectionScene from 'components/genericScenes/Collection';
import Movie from 'components/Movie';


const config = {
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