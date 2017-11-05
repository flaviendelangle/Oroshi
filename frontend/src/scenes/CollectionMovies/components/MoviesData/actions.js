import { movies } from '../../../../services/actions/titles/data'

export const switchLayout = layout => {
  return {
    type: movies.update_layout,
    layout
  }
};


export const sortMovies = (field, direction, layout) => {
  return {
    type: movies.sort,
    parameters: {field, direction, layout}
  };
};
