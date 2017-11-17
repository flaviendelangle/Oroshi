import React from 'react';

import CollectionScene from 'components/genericScenes/Collection';
import TVShow from 'components/TVShow';
import { TABLE_COLUMNS } from './services/list';

const config = {
  listColumns: TABLE_COLUMNS,
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