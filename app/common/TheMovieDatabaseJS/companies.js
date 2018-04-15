import API from './base'


class Companies extends API {
  CONFIG = {
    root: '/company',
    routes: {
      movies: 'movies',
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

export default new Companies()
