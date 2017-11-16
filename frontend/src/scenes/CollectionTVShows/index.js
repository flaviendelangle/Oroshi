import React, { Component } from 'react';

import CollectionScene from 'components/genericScenes/Collection';
import TVShow from 'components/TVShow';
import { TABLE_COLUMNS } from './services/list';

class CollectionTVShows extends Component {
  
  config = {
    listColumns: TABLE_COLUMNS,
    elementComponent: TVShow
  };
  
  render() {
    return (
      <CollectionScene
        {...this.props}
        config={this.config}
        scene="tv_shows"
      />
    );
  };
  
}

export default CollectionTVShows;