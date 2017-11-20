import React from 'react';

import CollectionScene from 'components/genericScenes/Collection';
import TVShow from 'components/TVShow';

const config = {
  elementComponent: TVShow
};

const CollectionTVShows = props => (
  <CollectionScene
    {...props}
    config={config}
    scene="tv_shows"
  />
);

export default CollectionTVShows;