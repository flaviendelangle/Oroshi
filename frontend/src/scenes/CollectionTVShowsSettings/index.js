import React, { Component } from 'react';

import CollectionSettingsScene from 'components/CollectionSettingsScene';


class CollectionTVShowsSettings extends Component {
  
  config = {
  
  };
  
  render() {
    return (
      <CollectionSettingsScene
        {...this.props}
        config={this.config}
        scene="tv_shows"
      />
    );
    
  }
  
}

export default CollectionTVShowsSettings;