import API from './index'

class Networks extends API {
  config = {
    root: '/networks',
  }

  retrieveOrCreate = body => super.retrieveOrCreate(body, 'tmdbId')
}

export const NetworksAPI = new Networks()
export const NetworksClass = Networks
