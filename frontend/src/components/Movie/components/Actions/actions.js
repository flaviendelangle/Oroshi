import { _removeMovieFromCollection } from 'services/actions/api'

export const removeMovie = (collection, id) => {
  return _removeMovieFromCollection(collection, id);
};