import { UsersAPI } from 'services/api/users';
import { users } from 'services/titles/api';
import { OauthAPI } from 'services/api/oauth';
import { destroyOauth } from 'services/localstorage';

export const create = (data) => {
  return {
    type: users.create,
    payload: UsersAPI.create(data).catch((error) => {
      return {
        error
      };
    })
  };
};

export const login = ({ username, password }) => {
  return {
    type: users.login,
    payload: OauthAPI.requestToken(username, password)
      .catch((error) => {
        return {
          error
        };
      }),
    meta: {
      username: username
    }
  }
};

export const logout = () => {
  destroyOauth();
  return {
    type: users.logout,
    payload: new Promise((resolve) => {
      window.setTimeout(() => {
        resolve();
      }, 1000);
    })
  }
};

export const loginFromCache = ({ oauth, meta }) => {
  return {
    type: users.login + '_FULFILLED',
    payload: oauth,
    meta
  }
};

export const getProfile = (username) => {
  return {
    type: users.getProfile,
    payload: UsersAPI.retrieveByUsername(username)
  };
};
