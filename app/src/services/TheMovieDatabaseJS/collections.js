import API from './base'


class Collections extends API {
  CONFIG = {
    root: '/collection',
    routes: {
      images: 'images',
    },
  }

  details = (pk, options = {}) => (
    super.retrieve(pk, options)
  )

  images = (pk, options = {}) => (
    super.detailRoute(pk, this.CONFIG.routes.images, options)
  )

  GET = {
    details: this.details,
    images: this.images,
  }
}

export default new Collections()
