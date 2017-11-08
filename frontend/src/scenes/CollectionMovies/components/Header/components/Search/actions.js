import { movies } from 'services/actions/titles/data'

export const update = query => {
  return {
    type: movies.update_search_query,
    query
  };
};