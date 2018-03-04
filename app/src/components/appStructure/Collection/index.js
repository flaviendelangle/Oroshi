import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import CollectionContent from '../../../scenes/Collection'
import CollectionSettings from '../../../scenes/CollectionSettings'
import CollectionSearch from '../../../scenes/CollectionSearch'
import ElementSuggestions from '../../../scenes/ElementSuggestions'
import Header from '../Header'

import typeManager from '../../../services/content/type'

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

const generate = () => typeManager.all().reduce((result, type) => {
  const scene = typeManager.access(type).values.legacy
  return [
    ...result,
    <Route
      path={`/collections/${type}/:collection_id/suggestions/:element_id/`}
      key={type}
      render={props => (
        <Scene {...getSceneProps(scene, 'suggestions', props)} Component={ElementSuggestions} />
      )}
    />,
    <Route
      path={`/collections/${type}/:collection_id/settings/`}
      key={type}
      render={props => (
        <Scene {...getSceneProps(scene, 'settings', props)} Component={CollectionSettings} />
      )}
    />,
    <Route
      path={`/collections/${type}/:collection_id/search/`}
      key={type}
      render={props => (
        <Scene {...getSceneProps(scene, 'search', props)} Component={CollectionSearch} />
      )}
    />,
    <Route
      path={`/collections/${type}/:collection_id/public/`}
      key={type}
      render={props => (
        <Scene {...getSceneProps(scene, 'content', props)} Component={CollectionContent} isPublic />
      )}
    />,
    <Route
      path={`/collections/${type}/:collection_id/`}
      key={type}
      render={props => (
        <Scene {...getSceneProps(scene, 'content', props)} Component={CollectionContent} />
      )}
    />,
  ]
}, [])

const Collection = () => (
  <Switch>
    {generate()}
  </Switch>
)

const Scene = ({ Component, ...props }) => (
  <div className={styles.Collection}>
    <Header {...props} />
    <section>
      <Component {...props} />
    </section>
  </div>
)

Scene.propTypes = {
  Component: PropTypes.func.isRequired,
}

export default Collection
