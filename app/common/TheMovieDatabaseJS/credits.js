import API from './base'


class Credits extends API {
  CONFIG = {
    root: '/credit',
    routes: {},
  }

  details = (pk, options = {}) => (
    super.retrieve(pk, options)
  )

  GET = {
    details: this.details,
  }
}

export default new Credits()
