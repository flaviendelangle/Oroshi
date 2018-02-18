import API from './index'

class Person extends API {
  CONFIG = {
    root: '/person',
    routes: {
      movie_credits: 'movie_credits',
      tv_credits: 'tv_credits',
      combined_credits: 'combined_credits',
      external_ids: 'external_ids',
      images: 'images',
      tagged_images: 'tagged_images',
      changes: 'changes',

      latest: 'latest',
      popular: 'popular',
    },
  }

  details = (pk, options = {}) => (
    super.retrieve(pk, options)
  )

  movieCredits = (pk, options = {}) => (
    super.detailRoute(pk, this.CONFIG.routes.movie_credits, options)
  )

  tvCredits = (pk, options = {}) => (
    super.detailRoute(pk, this.CONFIG.routes.tv_credits, options)
  )

  combinedCredits = (pk, options = {}) => (
    super.detailRoute(pk, this.CONFIG.routes.combined_credits, options)
  )

  externalIds = (pk, options = {}) => (
    super.detailRoute(pk, this.CONFIG.routes.external_ids, options)
  )

  images = (pk, options = {}) => (
    super.detailRoute(pk, this.CONFIG.routes.images, options)
  )

  taggedImages = (pk, options = {}) => (
    super.detailRoute(pk, this.CONFIG.routes.tagged_images, options)
  )

  changes = (pk, options = {}) => (
    super.detailRoute(pk, this.CONFIG.routes.changes, options)
  )

  latest = (options = {}) => (
    super.listRoute(this.CONFIG.routes.latest, options)
  )

  popular = (options = {}) => (
    super.listRoute(this.CONFIG.routes.popular, options)
  )

  GET = {
    movieCredits: this.movieCredits,
    tvCredits: this.tvCredits,
    combinedCredits: this.combinedCredits,
    externalIds: this.externalIds,
    images: this.images,
    taggedImages: this.taggedImages,
    changes: this.changes,

    latest: this.latest,
    popular: this.popular,
  }
}

export default new Person()
