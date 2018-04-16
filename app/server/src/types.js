import { mergeTypes } from 'merge-graphql-schemas'
import { get } from 'lodash'

import baseTypes from '../database/prisma.graphql'
import { getTypePlugins } from '../../common/lib/pluginLoader'


const moduleTypes = getTypePlugins().map((plugin) => {
  const types = get(plugin, 'config.types')
  if (types) {
    const { element, collection } = types
    const elementCapitalize = element.charAt(0).toUpperCase() + element.slice(1)
    const collectionCapitalize = collection.charAt(0).toUpperCase() + collection.slice(1)
    return `
      type Mutation {
        createOrConnect${elementCapitalize}(data: ID!): ID!
      }
    `
  }
  return {}
})


export default mergeTypes([baseTypes, ...moduleTypes])
