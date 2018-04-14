import API from './base'


class Changes extends API {
  CONFIG = {
    root: '',
    routes: {
      movie: 'movie/changes',
      tv: 'tv/changes',
      person: 'person/changes',
    },
  }

  movie = (options = {}) => (
    super.listRoute(this.CONFIG.routes.movie, options)
  )

  tv = (options = {}) => (
    super.listRoute(this.CONFIG.routes.tv, options)
  )

  person = (options = {}) => (
    super.listRoute(this.CONFIG.person.movie, options)
  )

  GET = {
    movie: this.movie,
    tv: this.tv,
    person: this.person,
  }
}

export default new Changes()
