import API from './base'


class Find extends API {
  CONFIG = {
    root: '/find',
    routes: {},
  }

  details = (pk, options = {}) => (
    super.retrieve(pk, options)
  )

  GET = {
    details: this.details,
  }
}

export default new Find()
