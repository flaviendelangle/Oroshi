import isNode from 'detect-node'
import { keyBy, mapValues } from 'lodash'

import oroshiConfig from '../../.oroshiconfig.json'


const TYPES = {
  collection_type: 'collection_type',
}

let plugins = []

const prepareActions = actions => mapValues(actions, (action, key) => {
  if (action.isForward) {
    return action.run(key)
  }
  return action
})

const loadPlugin = (plugin) => {
  /* eslint-disable import/no-dynamic-require, global-require */
  const actions = prepareActions(require(`../plugins/${plugin}/actions.js`).default)
  const base = {
    name: plugin,
    config: require(`../plugins/${plugin}/config.json`),
    plugin: require(`../plugins/${plugin}/${isNode ? 'server' : 'webapp'}`).default,
    actions,
    rawActions: actions,
  }
  return {
    ...base,
    ...require(`../plugins/${plugin}/index.js`).default,
  }
  /* eslint-enable import/no-dynamic-require, global-require */
}

const getPluginName = plugin => plugin.config.alias || plugin.name

export const getDependencies = (plugin) => {
  const { config } = plugin
  const dependenciesList = config && config.dependencies
  if (!dependenciesList) {
    return {}
  }
  const dependencies = dependenciesList.map((dependency) => {
    const name = Array.isArray(dependency) ? dependency[0] : dependency
    return plugins.find(el => el.name === name)
  })
  return keyBy(dependencies, getPluginName)
}

const bindDependencies = (plugin) => {
  const actions = mapValues(plugin.actions, el => (
    el.bind(this, ({
      dependencies: getDependencies(plugin),
      origin: plugin,
      current: plugin,
    }))
  ))

  return {
    ...plugin,
    actions,
  }
}

plugins = oroshiConfig.plugins.map(loadPlugin)
plugins = plugins.map(bindDependencies)


export const getAll = () => plugins

export const getTypePlugins = () => getAll().filter(el => el.config.type === TYPES.collection_type)

export const get = name => getAll().find(el => el.name === name)
