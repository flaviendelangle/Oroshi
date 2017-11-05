import { sortMovies as _sortMovies } from '../../actions'

export const sortMovies = (field, direction, layout) => {
  return _sortMovies(field, direction, layout);
};