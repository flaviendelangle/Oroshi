import { movies } from '../../../../services/actions/titles/data'

export const sortMovies = (field, direction) => {
  return {
    type: movies.sort,
    parameters: {field, direction}
  };
};