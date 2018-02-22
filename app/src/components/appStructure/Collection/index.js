import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import CollectionContent from '../../../scenes/Collection'
import CollectionSettings from '../../../scenes/CollectionSettings'
import CollectionSearch from '../../../scenes/CollectionSearch'
import ElementSuggestions from '../../../scenes/ElementSuggestions'
import Header from '../Header'

import { collectionTypes } from '../../../appConfig'

import styles from './Collection.scss'


const getSceneProps = (el, scene, sceneProps) => ({
  ...sceneProps,
  scene,
  config: el,
  type: el.name,
  collection: {
    pk: sceneProps.match.params.collection_id,
  },
})

const generate = () => collectionTypes.reduce((result, scene) => [
  ...result,
  <Route
    path={`/collections/${scene.name}/:collection_id/suggestions/:element_id/`}
    key={scene.name}
    render={props => (
      <Scene {...getSceneProps(scene, 'suggestions', props)} Component={ElementSuggestions} />
    )}
  />,
  <Route
    path={`/collections/${scene.name}/:collection_id/settings/`}
    key={scene.name}
    render={props => (
      <Scene {...getSceneProps(scene, 'settings', props)} Component={CollectionSettings} />
    )}
  />,
  <Route
    path={`/collections/${scene.name}/:collection_id/search/`}
    key={scene.name}
    render={props => (
      <Scene {...getSceneProps(scene, 'search', props)} Component={CollectionSearch} />
    )}
  />,
  <Route
    path={`/collections/${scene.name}/:collection_id/public/`}
    key={scene.name}
    render={props => (
      <Scene {...getSceneProps(scene, 'content', props)} Component={CollectionContent} isPublic />
    )}
  />,
  <Route
    path={`/collections/${scene.name}/:collection_id/`}
    key={scene.name}
    render={props => (
      <Scene {...getSceneProps(scene, 'content', props)} Component={CollectionContent} isPublic={false} />
    )}
  />,
], [])

const Collection = () => (
  <Switch>
    {generate()}
  </Switch>
)

const Scene = ({ Component, ...props }) => (
  <div className={styles.Collection}>
    <Header key={1} {...props} />
    <section>
      <Component key={2} {...props} />
    </section>
  </div>
)

Scene.propTypes = {
  Component: PropTypes.func.isRequired,
}

export default Collection
