import { MoviesAPI } from 'services/api/movies';
import { MovieCollectionsAPI } from 'services/api/movieCollections';
import MoviesTMDB from 'services/TheMovieDatabaseJS/movies'
import * as tmdb from './tmdb';

export const collectionAPI = MovieCollectionsAPI;

export const elementAPI = MoviesAPI;

export const publicAPI = MoviesTMDB;

export const addElement = tmdb.addElement;

export const addSeenToElements = (elements, seen) => {
  return elements.map(element => {
    const matches = seen.filter(seen => {
      return seen.movie === element.pk;
    });
    return {
      ...element,
      seen: matches.length > 0
    };
  });
};