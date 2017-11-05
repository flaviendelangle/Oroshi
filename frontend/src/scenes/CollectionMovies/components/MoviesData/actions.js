import { movies } from '../../../../services/actions/titles/data'

export const switchLayout = layout => {
  return {
    type: movies.update_layout,
    layout
  }
};


export const sortMovies = (layout, field, direction) => {
  return {
    type: movies.sort,
    parameters: {layout, field, direction}
  };
};
