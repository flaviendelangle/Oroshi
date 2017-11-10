import { _updateMovieInCollection } from 'services/actions/api'

export const updateMovieInCollection = (collection, id, data) => {
  return _updateMovieInCollection(collection, id, data);
};

