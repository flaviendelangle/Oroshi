import BaseAPI from './base';
import { OauthAPI } from './oauth';


export default class API extends BaseAPI {
  
  fetch(url, data) {
    const promise = OauthAPI.getTokenOrRefresh();
    if (!promise) {
      window.location.href = '/login';
    }
    return promise.then((oauth) => {
      if (!oauth) {
        window.location.href = '/login';
      }
      if (!data.hasOwnProperty('headers')) {
        data.headers = {};
      }
      data.headers.Authorization = oauth.token_type + ' ' + oauth.access_token;
      return super.fetch(url, data);
    })
  }
  
}