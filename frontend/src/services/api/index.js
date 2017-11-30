import BaseAPI from './base';
import { OauthAPI } from './oauth';


export default class API extends BaseAPI {
  
  fetch(url, data) {
    return OauthAPI.getTokenOrRefresh().then(token => {
      if(!token) {
        window.location.href = '/login';
      }
      if(!data.hasOwnProperty('headers')) {
        data.headers = {};
      }
      data.headers.Authorization = 'Bearer ' + token;
      return super.fetch(url, data);
    })
  }
  
}