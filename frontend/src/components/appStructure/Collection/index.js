import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import CollectionContent from 'scenes/Collection';
import CollectionSettings from 'scenes/CollectionSettings';
import ElementSuggestions from 'scenes/ElementSuggestions';
import { collectionTypes } from 'appConfig';


class Collection extends Component {
  
  getSceneProps = (el, props) => {
    return {
      ...props,
      config: el,
      scene: el.name,
      collection: {
        pk: props.match.params.collection_id,
      },
    }
    
  };
  
  render() {
    return (
      <Switch>
        {collectionTypes.map(el => [
          <Route
            path={`/collections/${el.name}/:collection_id/suggestions/:element_id/`}
            render={props => <ElementSuggestions {...this.getSceneProps(el, props)} />}
          />,
          <Route
            path={`/collections/${el.name}/:collection_id/settings/`}
            render={props => <CollectionSettings {...this.getSceneProps(el, props)} />}
          />,
          <Route
            path={`/collections/${el.name}/:collection_id/public/`}
            render={props => <CollectionContent  {...this.getSceneProps(el, props)}  isPublic={true} />}
          />,
          <Route
            path={`/collections/${el.name}/:collection_id/`}
            render={props => <CollectionContent {...this.getSceneProps(el, props)} isPublic={false} />}
          />
        ])}
      </Switch>
    );
  }
  
}

export default Collection;