import { UsersAPI } from 'services/api/users';
import { users } from 'services/titles/api';
import { OauthAPI } from 'services/api/oauth';
import { setValue, getValue } from 'services/localstorage';

export const create = data => {
  return {
    type: users.create,
    payload: UsersAPI.create(data).catch(error => {
      return {
        error
      };
    })
  };
};

export const login = data => {
  return {
    type: users.login,
    payload: OauthAPI.requestToken(data.username, data.password).catch(error => {
      return {
        error
      };
    })
  }
};

export const loginFromCache = oauth => {
  return {
    type: users.login + '_FULFILLED',
    payload: oauth
  }
};

export const saveOauth = oauth => {
  setValue('oauth', oauth);
};

export const loadOauth = () => {
  return getValue('oauth');
};