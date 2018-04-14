import API from './base'


class Networks extends API {
  CONFIG = {
    root: '/network',
    routes: {},
  }

  details = (pk, options = {}) => (
    super.retrieve(pk, options)
  )

  GET = {
    details: this.details,
  }
}

export default new Networks()
