import { request } from '../../titles/publicAPI'
import { getPublicActions } from '../../content/collectionTypes'


/*
  ACTIONS WITH DISPATCH
 */
export const search = (type, collection, query, page = 1) => ({
  type: request.search,
  payload: getPublicActions(type).search(type, collection, query, page),
  meta: {
    type,
    collection,
  },
})

export const getRecommendations = (type, collection) => ({
  type: request.get_recommendations,
  payload: getPublicActions(type).getRecommendations(type, collection),
  meta: {
    type,
    collection,
  },
})

export const getPopular = (type, collection, page) => ({
  type: request.get_popular,
  payload: getPublicActions(type).getPopular(type, collection, page),
  meta: {
    type,
    collection,
  },
})

export const getTopRated = (type, collection, page) => ({
  type: request.get_top_rated,
  payload: getPublicActions(type).getTopRated(type, collection, page),
  meta: {
    type,
    collection,
  },
})

export const getDetails = (type, shouldDispatch, collection, publicId) => {
  const payload = getPublicActions(type).getDetails(type, collection, publicId)
  if (shouldDispatch) {
    return {
      type: request.get_details,
      payload,
      meta: {
        type,
        collection,
        [`${type}_id`]: publicId,
      },
    }
  }
  return payload
}


/*
  ACTIONS WITHOUT DISPATCH
 */

export const checkExistence = (type, ...args) => (
  getPublicActions(type).checkExistence(type, ...args)
)

export const getTitle = (type, ...args) => (
  getPublicActions(type).getTitle(type, ...args)
)

export const getPoster = (type, ...args) => (
  getPublicActions(type).getPoster(type, ...args)
)

export const cleanDetails = (type, details) => (
  getPublicActions(type).cleanDetails(type, details)
)
