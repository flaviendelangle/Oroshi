import API from './base'


class Genres extends API {
  CONFIG = {
    root: '/genre',
    routes: {
      movie: 'movie/list',
      tv: 'tv/list',
      movies: 'movies',
    },
  }

  movie = (options = {}) => (
    super.listRoute(this.CONFIG.routes.movie, options)
  )

  tv = (options = {}) => (
    super.listRoute(this.CONFIG.routes.tv, options)
  )

  movies = (pk, options = {}) => {
    console.warn('The method /genre/{genre_id}/movies is deprecated') // eslint-disable-line no-console
    return super.detailRoute(pk, this.CONFIG.routes.movies, options)
  }

  GET = {
    movie: this.movie,
    tv: this.tv,
    movies: this.movies,
  }
}

export default new Genres()
