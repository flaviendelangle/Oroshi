import { search } from 'services/titles/data'

export const update = (type, collection, query) => {
  return {
    type: search.update_query,
    query,
    meta: {
      type,
      collection,
    },
  };
};
