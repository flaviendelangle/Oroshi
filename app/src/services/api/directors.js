import API from './index'

class Directors extends API {
  config = {
    root: '/directors',
  }

  retrieveOrCreate = body => super.retrieveOrCreate(body, 'tmdbId')
}

export const DirectorsAPI = new Directors()
export const DirectorsClass = Directors
