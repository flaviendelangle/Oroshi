import * as movies from './movies';
import * as tv_shows from './tv_shows';

import { request } from 'services/titles/publicAPI'

export const search = (scene, collection, query) => {
  return {
    type: request.search,
    payload: getModule(scene).search(scene, collection, query),
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