import API from './base'


class GuestSessions extends API {
  CONFIG = {
    root: '/guest_session',
    routes: {
      rated_movies: 'rated/movies',
      rated_tv: 'rated/tv',
      rated_tv_episodes: 'rated/tv/episodes',
    },
  }

  ratedMovies = (pk, options = {}) => (
    super.detailRoute(pk, this.CONFIG.routes.rated_movies, options)
  )

  ratedTV = (pk, options = {}) => (
    super.detailRoute(pk, this.CONFIG.routes.rated_tv, options)
  )

  ratedTVEpisodes = (pk, options = {}) => (
    super.detailRoute(pk, this.CONFIG.routes.rated_tv_episodes, options)
  )

  GET = {
    rated_movies: this.ratedMovies,
    rated_tv: this.ratedTV,
    rated_tv_episodes: this.ratedTVEpisodes,
  }
}

export default new GuestSessions()
