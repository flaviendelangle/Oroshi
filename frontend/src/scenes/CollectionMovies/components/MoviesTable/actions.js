import { movies } from '../../../../services/actions/titles/data'

export const sortMovies = (field, direction) => {
  return {
    type: movies.sort,
    parameters: {field, direction}
  };
};

export const switchLayout = layout => {
  return {
    type: movies.update_layout,
    layout
  }
};