import { sortMovies } from '../../../MoviesData/actions'

export const updateOrder = (...args) => {
  return sortMovies(...args);
};