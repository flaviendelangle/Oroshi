import React from 'react';

import CollectionSettingsScene from 'components/genericScenes/CollectionSettings';


const config = {
};

const CollectionTVShowsSettings = props => (
  <CollectionSettingsScene
    {...props}
    config={config}
    scene="tv_shows"
  />
);

export default CollectionTVShowsSettings;