import API from './base'


class Certifications extends API {
  CONFIG = {
    root: '/certification',
    routes: {
      movie: 'movie/list',
      tv: 'tv/list',
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

export default new Certifications()
