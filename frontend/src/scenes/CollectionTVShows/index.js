import React, { Component } from 'react';

import CollectionScene from 'components/CollectionScene';
import { TABLE_COLUMNS } from './services/list';

class CollectionTVShows extends Component {
  
  config = {
    listColumns: TABLE_COLUMNS,
    elementComponent: null
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