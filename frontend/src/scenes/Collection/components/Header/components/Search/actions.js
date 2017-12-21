import { search } from 'services/titles/data'

export const update = (scene, query) => {
  return {
    type: search.update_query,
    query,
    meta: {
      scene,
    }
  };
};