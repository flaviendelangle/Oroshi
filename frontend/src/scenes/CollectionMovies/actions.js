import { prepareMovies } from '../CollectionSettings/services/utils'

import {
  _loadMovieCollection,
  _updateMovieInCollection
} from 'services/actions/api'

export const loadCollection = pk => {
  const results = _loadMovieCollection(pk);
  results.payload = results.payload.then(response => {
    return prepareMovies(response);
  });
  return results;
};

export const updateMovieInCollection = (collection, id, data) => {
  return _updateMovieInCollection(collection, id, data);
};

