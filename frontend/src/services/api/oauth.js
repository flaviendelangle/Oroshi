import API from './index'
import { OAUTH2 as config } from 'appConfig';

class Oauth extends API {
  
  config = {
    root: '/o'
  };
  
  requestToken = (username, password) => {
    const body = {
      username,
      password,
      grant_type: config.grant_type,
      client_id: config.client_id
    };
    return super.list_route('token', 'POST', body)
  };
  
}



export const OauthAPI = new Oauth();
export const OauthClass = Oauth;