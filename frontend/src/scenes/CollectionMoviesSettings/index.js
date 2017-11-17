import React from 'react';

import CollectionSettingsScene from 'components/genericScenes/CollectionSettings';

const config = {
};

const CollectionMoviesSettings = props => (
  <CollectionSettingsScene
    {...props}
    config={config}
    scene="movies"
  />
);

export default CollectionMoviesSettings;