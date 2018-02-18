import BaseAPI from './base'
import { OauthAPI } from './oauth'


export default class API extends BaseAPI {
  fetch(url, _data) {
    const promise = OauthAPI.getTokenOrRefresh()
    if (!promise) {
      window.location.href = '/login'
    }
    return promise.then((oauth) => {
      if (!oauth) {
        window.location.href = '/login'
      }
      const data = { ..._data }
      if (!Object.prototype.hasOwnProperty.call(data, 'headers')) {
        data.headers = {}
      }
      data.headers.Authorization = `${oauth.token_type} ${oauth.access_token}`
      return super.fetch(url, data)
    })
  }
}
