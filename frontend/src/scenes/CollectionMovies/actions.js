import { prepareMovies } from '../CollectionSettings/services/utils'

import {
  _loadCollection,
  _addMovieToCollection,
  _updateMovieInCollection
} from 'services/actions/api'

export const loadCollection = pk => {
  const results = _loadCollection(pk);
  results.payload = results.payload.then(response => {
    return prepareMovies(response);
  });
  return results;
};

export const addMovieToCollection = data => {
  return _addMovieToCollection(data);
};


export const updateMovieInCollection = (collection, id, data) => {
  return _updateMovieInCollection(collection, id, data);
};

