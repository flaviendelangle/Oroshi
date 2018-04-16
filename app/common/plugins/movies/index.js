import publicAPI from '../../TheMovieDatabaseJS/movies'
import * as queries from './queries.graphql'
import * as mutations from './mutations.graphql'

export default {
  queries,
  mutations,
  api: 2,
  public_api: publicAPI,
}
