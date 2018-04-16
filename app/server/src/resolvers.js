import { forwardTo } from 'prisma-binding'
import { get } from 'lodash'
import { mergeResolvers } from 'merge-graphql-schemas'

import { getTypePlugins } from '../../common/lib/pluginLoader'


const forward = forwardTo('db')

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

const createOrConnectSubKeys = (elements, data, ctx) => {
  const { mutation } = ctx.db

  const applyResult = (result, value, { key, many }, isComplete) => {
    const newValue = isComplete ? value : { api_id: value.api_id }
    if (many) {
      const current = get(result, `${key}s.connect`) || []
      return {
        ...result,
        [`${key}s`]: {
          connect: [...current, newValue],
          create: [],
        },
      }
    }
    return {
      ...result,
      [key]: newValue,
    }
  }

  const generateResult = (result, value, element) => ({
    partial: applyResult(result.partial, value, element, false),
    complete: applyResult(result.complete, value, element, true),
  })

  const recurse = (index, result) => {
    if (index >= elements.length) {
      return result
    }
    const element = elements[index]
    const { key, value } = element
    const keyCapitalize = capitalize(key)

    return mutation[`upsert${keyCapitalize}`]({
      where: {
        api_id: value.api_id,
      },
      create: value,
      update: {},
    }).then(res => recurse(index + 1, generateResult(result, res, element)))
  }
  return recurse(0, { partial: data, complete: data })
}

const applySubKeys = (partial, complete, subKeys) => subKeys.reduce((result, key) => {
  const singleItem = get(complete, `${key}.connect`)
  const multipleItem = get(complete, `${key}s.connect`)

  if (singleItem) {
    return {
      ...result,
      [key]: singleItem,
    }
  }
  if (multipleItem) {
    return {
      ...result,
      [`${key}s`]: multipleItem,
    }
  }
  return result
}, partial)

const link = (plugin, action, many = false) => {
  const { element, collection, sub_keys: subKeys } = get(plugin, 'config.types')
  if (!subKeys) {
    return forward
  }
  const object = many ? collection : element
  const objectCapitalize = capitalize(object)
  return (parent, { data }, ctx) => {
    const elements = subKeys.reduce((result, key) => {
      if (data[key]) {
        return [...result, { key, value: data[key].create, many: false }]
      }
      if (data[`${key}s`]) {
        const keyResult = data[`${key}s`].create.reduce((dataResult, value) => (
          [...dataResult, { key, value, many: true }]
        ), [])
        return [...result, ...keyResult]
      }
      return []
    }, [])

    return createOrConnectSubKeys(elements, data, ctx).then(result => (
      ctx.db.mutation[`${action}${objectCapitalize}`]({ data: result.partial }).then(res => (
        applySubKeys(res, result.complete, subKeys)
      ))
    ))
  }
}

const moduleResolvers = getTypePlugins().map((plugin) => {
  const types = get(plugin, 'config.types')
  if (types) {
    const { element, collection } = types
    const elementCapitalize = capitalize(element)
    const collectionCapitalize = capitalize(collection)
    return {
      Query: {
        [element]: forward,
        [`${element}s`]: forward,
        [collection]: forward,
        [`${collection}s`]: forward,
      },
      Mutation: {
        [`create${elementCapitalize}`]: link(plugin, 'create'),
        [`update${elementCapitalize}`]: forward,
        [`delete${elementCapitalize}`]: forward,
        [`upsert${elementCapitalize}`]: forward,
        [`updateMany${elementCapitalize}s`]: forward,
        [`deleteMany${elementCapitalize}s`]: forward,

        [`create${collectionCapitalize}`]: forward,
        [`update${collectionCapitalize}`]: forward,
        [`delete${collectionCapitalize}`]: forward,
        [`upsert${collectionCapitalize}`]: forward,
        [`updateMany${collectionCapitalize}s`]: forward,
        [`deleteMany${collectionCapitalize}s`]: forward,
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

export default mergeResolvers([baseRevolvers, ...moduleResolvers])
