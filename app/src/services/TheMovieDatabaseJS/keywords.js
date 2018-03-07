import API from './base'


class Keywords extends API {
  CONFIG = {
    root: '/keyword',
    routes: {
      details: 'details',
    },
  }

  details = (pk, options = {}) => (
    super.retrieve(pk, options)
  )

  movies = (pk, options = {}) => (
    super.detailRoute(pk, this.CONFIG.routes.movies, options)
  )

  GET = {
    details: this.details,
    movies: this.movies,
  }
}

export default new Keywords()
