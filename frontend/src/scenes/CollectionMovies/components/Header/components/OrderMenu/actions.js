import { sortMovies } from '../../../MoviesData/components/List/actions'

export const updateOrder = (field, direction) => {
  return sortMovies(field, direction);
};