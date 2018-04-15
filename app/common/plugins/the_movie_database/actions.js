import { getDependencyConfig } from '../../lib/actions'


export default {
  /**
   * Required actions
   */
  getPopular: ({ origin }, page = 1) => origin.public_api.popular({ page }),

  getTopRated: ({ origin }, page = 1) => origin.public_api.topRated({ page }),

  search: ({ origin, current }, collection, query, page) => {
    const searchKey = getDependencyConfig(origin, current.name).search_key
    return current.search_api[searchKey](query, { page })
  },
}
