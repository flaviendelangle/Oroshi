import React, { Component } from 'react';

import CollectionSettingsScene from 'components/CollectionSettingsScene';


class CollectionMoviesSettings extends Component {
  
  config = {
  
  };
  
  render() {
    return (
      <CollectionSettingsScene
        {...this.props}
        config={this.config}
        scene="movies"
      />
    );
    
  }
  
}

export default CollectionMoviesSettings;