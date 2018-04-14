import { search } from '../titles/data'

// eslint-disable-next-line import/prefer-default-export
export const updateQuery = (type, collection, query) => ({
  type: search.update_query,
  query,
  meta: {
    type,
    collection,
  },
})
