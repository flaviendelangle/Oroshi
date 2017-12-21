import { request } from 'services/titles/publicAPI'
import { getPublicActions } from 'services/content/collectionTypes';

/*
  ACTIONS WITH DISPATCH
 */
export const search = (scene, collection, query, page=1) => {
  return {
    type: request.search,
    payload: getPublicActions(scene).search(scene, collection, query, page),
    meta: {
      scene
    }
  };
};

export const getRecommendations = (scene, collection) => {
 return {
   type: request.get_recommendations,
   payload: getPublicActions(scene).getRecommendations(scene, collection),
   meta: {
     scene
   }
 }
};

export const getPopular = (scene, collection, page) => {
  return {
    type: request.get_popular,
    payload: getPublicActions(scene).getPopular(scene, collection, page),
    meta: {
      scene
    }
  }
};

export const getTopRated = (scene, collection, page) => {
  return {
    type: request.get_top_rated,
    payload: getPublicActions(scene).getTopRated(scene, collection, page),
    meta: {
      scene
    }
  }
};

export const getDetails = (scene, shouldDispatch, collection, publicId) => {
  const payload = getPublicActions(scene).getDetails(scene, collection, publicId);
  if (shouldDispatch) {
    return {
      type: request.get_details,
      payload,
      meta: {
        scene,
        [scene + '_id']: publicId
      }
    };
  }
  return payload;
};


/*
  ACTIONS WITHOUT DISPATCH
 */

export const checkExistence = (scene, ...args) => {
  return getPublicActions(scene).checkExistence(scene, ...args);
};

export const getTitle = (scene, ...args) => {
  return getPublicActions(scene).getTitle(scene, ...args);
};

export const getPoster = (scene, ...args) => {
  return getPublicActions(scene).getPoster(scene, ...args);
};

export const cleanDetails = (scene, details) => {
  return getPublicActions(scene).cleanDetails(scene, details);
};