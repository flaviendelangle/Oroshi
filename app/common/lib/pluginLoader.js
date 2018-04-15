import isNode from 'detect-node'

import config from '../../.oroshiconfig'


const loadPlugin = (plugin) => {
  const base = `../plugins/${plugin}`
  return {
    common: require(`${base}/common`).default, // eslint-disable-line
    plugin: require(`${base}/${isNode ? 'server' : 'webapp'}`).default, // eslint-disable-line
  }
}

const plugins = config.plugins.map(loadPlugin)


export const getPlugins = () => plugins

export const getTypePlugins = () => plugins.filter(el => el.common.type === 'collection_type')
