import { TVShowsAPI } from 'services/api/tvShows';
import { TVShowCollectionsAPI } from 'services/api/tvShowsCollections';
import TVShowsTMDB from 'services/TheMovieDatabaseJS/tv'
import * as tmdb from './tmdb';


export const collectionAPI = TVShowCollectionsAPI;

export const elementAPI = TVShowsAPI;

export const publicAPI = TVShowsTMDB;

export const addElement = tmdb.addElement;

export const addSeenToElements = (elements, seen) => {
  return elements.map(element => {
    return {
      ...element,
      seen: false
    };
  });
};

export const exportFields = ['tmdbId', 'title', 'note'];