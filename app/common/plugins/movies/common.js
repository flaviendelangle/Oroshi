import * as queries from './queries.graphql'

export default {
  type: 'collection_type',
  name: 'movies',
  graphQL: {
    queries,
    types: {
      element: 'movie',
      collection: 'movieCollection',
    },
  },
}
