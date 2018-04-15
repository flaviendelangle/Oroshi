import { forwardTo } from 'prisma-binding'
import { get } from 'lodash'
import { mergeResolvers } from 'merge-graphql-schemas'

import { getTypePlugins } from '../../common/lib/pluginLoader'


const forward = forwardTo('db')

const typeResolvers = getTypePlugins().map(({ common }) => {
  const types = get(common, 'graphQL.types')
  if (types) {
    const { element } = types
    const typeCapitalize = element.charAt(0).toUpperCase() + element.slice(1)
    return {
      Query: {
        [types.element]: forward,
        [`${types.element}s`]: forward,
      },
      Mutation: {
        [`create${typeCapitalize}`]: forward,
        [`update${typeCapitalize}`]: forward,
        [`delete${typeCapitalize}`]: forward,
        [`upsert${typeCapitalize}`]: forward,
        [`updateMany${typeCapitalize}s`]: forward,
        [`deleteMany${typeCapitalize}s`]: forward,
      },
    }
  }
  return {}
})

const baseRevolvers = {
  Query: {
    directors: forward,
    director: forward,
  },
  Mutation: {
    createTitle: forward,
    createPoster: forward,
    createDirector: forward,
    createGenre: forward,
    updateTitle: forward,
    updatePoster: forward,
    updateDirector: forward,
    updateGenre: forward,
    deleteTitle: forward,
    deletePoster: forward,
    deleteDirector: forward,
    deleteGenre: forward,
    upsertTitle: forward,
    upsertPoster: forward,
    upsertDirector: forward,
    upsertGenre: forward,
    updateManyTitles: forward,
    updateManyPosters: forward,
    updateManyDirectors: forward,
    updateManyGenres: forward,
    deleteManyTitles: forward,
    deleteManyPosters: forward,
    deleteManyDirectors: forward,
    deleteManyGenres: forward,
  },
}

export default mergeResolvers([baseRevolvers, ...typeResolvers])
