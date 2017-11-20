import { MoviesAPI } from 'services/api/movies';
import { MovieCollectionsAPI } from 'services/api/movieCollections';
import MoviesTMDB from 'services/TheMovieDatabaseJS/movies'

import * as tmdb from './tmdb';
import { updateElement } from './index';

export const collectionAPI = MovieCollectionsAPI;

export const elementAPI = MoviesAPI;

export const publicAPI = MoviesTMDB;

export const addElement = tmdb.addElement;

export const switchSeenOnElement = data => {
  const clearedData = {
    seen: !data.seen
  };
  return updateElement('movies', data.collection, data.pk, clearedData);
};

export const addSeenToElements = (elements, seen) => {
  return elements.map(element => {
    const matches = seen.find(seen => {
      return seen.movie === element.pk;
    });
    return {
      ...element,
      seen: !!matches
    };
  });
};

export const exportFields = ['tmdbId', 'title', 'release', 'note', 'seen'];