import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import CollectionContent from 'scenes/Collection';
import CollectionSettings from 'scenes/CollectionSettings';
import ElementSuggestions from 'scenes/ElementSuggestions';
import Header from 'components/appStructure/Header';
import { collectionTypes } from 'appConfig';


const getSceneProps = (el, sceneProps) => {
  const props = {
    ...sceneProps,
    config: el,
    scene: el.name,
    collection: {
      pk: sceneProps.match.params.collection_id,
    },
  };
  return props;
};

const generate = () => {
  const a = collectionTypes.reduce((result, scene, index) => {
    return [
      ...result,
      <Route
        path={`/collections/${scene.name}/:collection_id/suggestions/:element_id/`}
        key={`${scene.name}_${index}`}
        render={props => (
          <Scene {...getSceneProps(scene, props)} Component={ElementSuggestions} />
        )}
      />,
      <Route
        path={`/collections/${scene.name}/:collection_id/settings/`}
        key={`${scene.name}_${index}`}
        render={props => (
          <Scene {...getSceneProps(scene, props)} Component={CollectionSettings} />
        )}
      />,
      <Route
        path={`/collections/${scene.name}/:collection_id/public/`}
        key={`${scene.name}_${index}`}
        render={props => (
          <Scene {...getSceneProps(scene, props)} Component={CollectionContent} isPublic={true} />
        )}
      />,
      <Route
        path={`/collections/${scene.name}/:collection_id/`}
        key={`${scene.name}_${index}`}
        render={props => (
          <Scene {...getSceneProps(scene, props)} Component={CollectionContent} isPublic={false} />
        )}
      />,
    ]
  }, []);
  return a;
};

class Collection extends Component {
  
  render() {
    return (
      <Switch>
        {generate()}
      </Switch>
    );
  }
}

const Scene = ({ Component, ...props }) => {
  return [
    <Component
      key={1}
      {...props}
    />
  ];
};

export default Collection;