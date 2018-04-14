import { request } from '../../titles/publicAPI'
import tM from '../../content/type'

/*
  ACTIONS WITH DISPATCH
 */
export const search = (type, collection, query, page = 1) => ({
  type: request.search,
  payload: tM.run(type).public().search(type, collection, query, page),
  meta: {
    type,
    collection,
  },
})

export const getRecommendations = (type, collection) => ({
  type: request.get_recommendations,
  payload: tM.run(type).public().getRecommendations(type, collection),
  meta: {
    type,
    collection,
  },
})

export const getPopular = (type, collection, page) => ({
  type: request.get_popular,
  payload: tM.run(type).public().getPopular(type, collection, page),
  meta: {
    type,
    collection,
  },
})

export const getTopRated = (type, collection, page) => ({
  type: request.get_top_rated,
  payload: tM.run(type).public().getTopRated(type, collection, page),
  meta: {
    type,
    collection,
  },
})

export const getDetails = (type, shouldDispatch, collection, publicId) => {
  const payload = tM.run(type).public().getDetails(type, collection, publicId)
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
  tM.run(type).public().checkExistence(type, ...args)
)

export const getTitle = (type, ...args) => (
  tM.run(type).public().getTitle(type, ...args)
)

export const getPoster = (type, ...args) => (
  tM.run(type).public().getPoster(type, ...args)
)

export const cleanDetails = (type, details) => (
  tM.run(type).public().cleanDetails(type, details)
)
