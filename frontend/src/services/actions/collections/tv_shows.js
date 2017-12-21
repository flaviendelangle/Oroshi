import { TVShowsAPI } from 'services/api/tvShows';
import { TVShowCollectionsAPI } from 'services/api/tvShowsCollections';
import TVShowsTMDB from 'services/TheMovieDatabaseJS/tv';
import TVShowClass from 'components/collectionTypes/tvShows/elementClass';

import * as tmdb from './tmdb';

export const elementClass = TVShowClass;

export const collectionAPI = TVShowCollectionsAPI;

export const elementAPI = TVShowsAPI;

export const publicAPI = TVShowsTMDB;

export const addElement = tmdb.addElement;

export const prepareElement = (element, seenList) => {
  const seen = false;
  element.setSeen(seen);
};

export const exportFields = ['tmdbId', 'title', 'note'];