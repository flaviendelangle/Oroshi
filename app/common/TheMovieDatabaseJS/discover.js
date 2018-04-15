import API from './base'


class Discover extends API {
  CONFIG = {
    root: '/discover',
    routes: {
      movie: 'movie',
      tv: 'tv',
    },
  }

  movie = (options = {}) => (
    super.listRoute(this.CONFIG.routes.movie, options)
  )

  tv = (options = {}) => (
    super.listRoute(this.CONFIG.routes.tv, options)
  )

  GET = {
    movie: this.movie,
    tv: this.tv,
  }
}

export default new Discover()
