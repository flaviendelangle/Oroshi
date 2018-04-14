import API from './base'


class Reviews extends API {
  CONFIG = {
    root: '/review',
    routes: {},
  }

  details = (pk, options = {}) => (
    super.retrieve(pk, options)
  )

  GET = {
    details: this.details,
  }
}

export default new Reviews()
