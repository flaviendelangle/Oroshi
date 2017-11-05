import { sortMovies } from '../../../MoviesData/actions'

export const updateOrder = (field, direction, layout) => {
  return sortMovies(field, direction, layout);
};