import API from './index'

class Genres extends API {
  config = {
    root: '/genres',
  }

  retrieveOrCreate = body => super.retrieveOrCreate(body, 'tmdbId')
}

export const GenresAPI = new Genres()
export const GenresClass = Genres
