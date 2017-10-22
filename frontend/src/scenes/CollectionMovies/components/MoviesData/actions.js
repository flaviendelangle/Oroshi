import { movies } from '../../../../services/actions/titles/data'

export const switchLayout = layout => {
  return {
    type: movies.update_layout,
    layout
  }
};