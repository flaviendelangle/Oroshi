import * as movies from './movies';
import * as tv_shows from './tv_shows';

import { request } from 'services/titles/publicAPI'


/*
  ACTIONS WITH DISPATCH
 */
export const search = (scene, collection, query, page=1) => {
  return {
    type: request.search,
    payload: getModule(scene).search(scene, collection, query, page),
    meta: {
      scene
    }
  };
};

export const getRecommendations = (scene, collection) => {
 return {
   type: request.get_recommendations,
   payload: getModule(scene).getRecommendations(scene, collection),
   meta: {
     scene
   }
 }
};

export const getPopular = (scene, collection, page) => {
  return {
    type: request.get_popular,
    payload: getModule(scene).getPopular(scene, collection, page),
    meta: {
      scene
    }
  }
};

export const getTopRated = (scene, collection, page) => {
  return {
    type: request.get_top_rated,
    payload: getModule(scene).getTopRated(scene, collection, page),
    meta: {
      scene
    }
  }
};

export const getDetails = (scene, shouldDispatch, collection, publicId) => {
  const payload = getModule(scene).getDetails(scene, collection, publicId);
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
  return getModule(scene).checkExistence(scene, ...args);
};

export const getTitle = (scene, ...args) => {
  return getModule(scene).getTitle(scene, ...args);
};

export const getPoster = (scene, ...args) => {
  return getModule(scene).getPoster(scene, ...args);
};

export const cleanDetails = (scene, details) => {
  return getModule(scene).cleanDetails(scene, details);
};

export const getModule = scene => {
  switch(scene) {
    case 'movies':
      return movies;
    case 'tv_shows':
      return tv_shows;
    default:
      return null;
  }
};