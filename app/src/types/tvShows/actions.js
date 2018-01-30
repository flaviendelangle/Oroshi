import { TVShowsAPI } from 'services/api/tvShows';
import { TVShowCollectionsAPI } from 'services/api/tvShowsCollections';
import TVShowsTMDB from 'services/TheMovieDatabaseJS/tv';
import TVShowClass from './elementClass';

import * as tmdb from 'services/actions/collections/tmdb';


export const elementClass = TVShowClass;

export const collectionAPI = TVShowCollectionsAPI;

export const elementAPI = TVShowsAPI;

export const publicAPI = TVShowsTMDB;

export const {
  addElement,
  getSuggestions,
} = tmdb;

export const prepareElement = (element) => {
  const seen = false;
  element.setSeen(seen);
};

export const exportFields = ['tmdbId', 'title', 'note'];