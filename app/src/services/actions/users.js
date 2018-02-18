import { UsersAPI } from 'services/api/users'
import { users } from 'services/titles/api'
import { OauthAPI } from 'services/api/oauth'
import { destroyOauth } from 'services/localstorage'


export const create = data => ({
  type: users.create,
  payload: UsersAPI.create(data).catch(error => ({ error })),
})

export const login = ({ username, password }) => ({
  type: users.login,
  payload: OauthAPI.requestToken(username, password)
    .catch(error => ({ error })),
  meta: {
    username,
  },
})

export const logout = () => {
  destroyOauth()
  return {
    type: users.logout,
    payload: new Promise((resolve) => {
      window.setTimeout(() => {
        resolve()
      }, 1000)
    }),
  }
}

export const loginFromCache = ({ oauth, meta }) => ({
  type: `${users.login}_FULFILLED`,
  payload: oauth,
  meta,
})

export const getProfile = username => ({
  type: users.getProfile,
  payload: UsersAPI.retrieveByUsername(username),
})
