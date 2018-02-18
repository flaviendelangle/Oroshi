import API from './index'

class Movies extends API {
  CONFIG = {
    root: '/movie',
    routes: {
      account_states: 'account_states',
      alternative_titles: 'alternative_titles',
      credits: 'credits',
      images: 'images',
      keywords: 'keywords',
      release_dates: 'release_dates',
      videos: 'videos',
      translations: 'translations',
      recommendations: 'recommendations',
      similar: 'similar',
      reviews: 'reviews',
      lists: 'lists',

      rating: 'rating',

      latest: 'latest',
      now_playing: 'now_playing',
      popular: 'popular',
      top_rated: 'top_rated',
      upcoming: 'upcoming',
    },
  }

  details = (pk, options = {}) => (
    super.retrieve(pk, options)
  )

  accountStates = (pk, options = {}) => (
    super.detailRoute(pk, this.CONFIG.routes.account_states, options)
  )

  alternativeTitles = (pk, options = {}) => (
    super.detailRoute(pk, this.CONFIG.routes.alternative_titles, options)
  )

  credits = (pk, options = {}) => (
    super.detailRoute(pk, this.CONFIG.routes.credits, options)
  )

  images = (pk, options = {}) => (
    super.detailRoute(pk, this.CONFIG.routes.images, options)
  )

  keywords = (pk, options = {}) => (
    super.detailRoute(pk, this.CONFIG.routes.keywords, options)
  )

  releaseDates = (pk, options = {}) => (
    super.detailRoute(pk, this.CONFIG.routes.release_dates, options)
  )

  videos = (pk, options = {}) => (
    super.detailRoute(pk, this.CONFIG.routes.videos, options)
  )

  translations = (pk, options = {}) => (
    super.detailRoute(pk, this.CONFIG.routes.translations, options)
  )

  recommendations = (pk, options = {}) => (
    super.detailRoute(pk, this.CONFIG.routes.recommendations, options)
  )

  similarMovies = (pk, options = {}) => (
    super.detailRoute(pk, this.CONFIG.routes.similar, options)
  )

  reviews = (pk, options = {}) => (
    super.detailRoute(pk, this.CONFIG.routes.reviews, options)
  )

  lists = (pk, options = {}) => (
    super.detailRoute(pk, this.CONFIG.routes.lists, options)
  )

  latest = (options = {}) => (
    super.listRoute(this.CONFIG.routes.latest, options)
  )

  nowPlaying = (options = {}) => (
    super.listRoute(this.CONFIG.routes.now_playing, options)
  )

  popular = (options = {}) => (
    super.listRoute(this.CONFIG.routes.popular, options)
  )

  topRated = (options = {}) => (
    super.listRoute(this.CONFIG.routes.top_rated, options)
  )

  upcoming = (options = {}) => (
    super.listRoute(this.CONFIG.routes.upcoming, options)
  )

  GET = {

    details: this.details,
    accountStates: this.accountStates,
    alternativeTitles: this.alternativeTitles,
    credits: this.credits,
    images: this.images,
    keywords: this.keywords,
    releaseDates: this.releaseDates,
    videos: this.videos,
    translations: this.translations,
    recommendations: this.recommendations,
    similarMovies: this.similarMovies,
    reviews: this.reviews,
    lists: this.lists,
    latest: this.latest,
    nowPlaying: this.nowPlaying,
    popular: this.popular,
    topRated: this.topRated,
    upcoming: this.upcoming,

  }

  POST = {
    rating: (pk, options = {}) => (
      super.detailRoute(pk, this.CONFIG.routes.rating, options, 'POST')
    ),
  }

  DELETE = {
    rating: (pk, options = {}) => (
      super.detailRoute(pk, this.CONFIG.routes.rating, options, 'DELETE')
    ),
  }
}

export default new Movies()

export const publicRoot = 'https://www.themoviedb.org/movie/'
