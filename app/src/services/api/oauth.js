import BaseAPI from './base'
import { OAUTH2 as config } from '../../config'
import { loadOauth, saveOauth, destroyOauth } from '../localstorage'


const addExpiration = response => ({
  ...response,
  expiration: new Date().getTime() + (response.expires_in * 1000),
})

class Oauth extends BaseAPI {
  config = {
    root: '/o',
  }

  requestToken = (username, password) => {
    const body = {
      username,
      password,
      grant_type: config.grant_type,
      client_id: config.client_id,
    }
    return super.listRoute('token', 'POST', body).then(addExpiration)
  }

  refreshToken = (refreshToken) => {
    const body = {
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
      client_id: config.client_id,
    }
    return super.listRoute('token', 'POST', body)
  }

  getTokenOrRefresh = () => {
    const { oauth, meta } = loadOauth('oauth')
    const SECURITY_MARGIN = 10000
    if (
      oauth &&
      oauth.expiration
    ) {
      if (oauth.expiration > new Date().getTime() + SECURITY_MARGIN) {
        return Promise.resolve({ oauth, meta })
      }
      return this.refreshToken(oauth.refresh_token)
        .catch((response) => {
          if (response.error === 'invalid_grant') {
            destroyOauth()
          }
          return undefined
        })
        .then((_response) => {
          if (_response) {
            const response = addExpiration(_response)
            saveOauth(response)
            return response
          }
          return null
        })
    }
    return null
  }
}


export const OauthAPI = new Oauth()
export const OauthClass = Oauth
