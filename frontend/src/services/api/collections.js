import API  from './index'
import { MoviesClass } from './movies'

class Collections extends API {
  
  config = {
    root: '/collections'
  };
  
  nested_routes = {
    movies: MoviesClass
  };
  
  settings = pk => {
    if(pk) {
      return super.detail_route(pk, 'settings');
    }
    return super.list_route('settings');
  }
  
}


export const CollectionsAPI = new Collections();
export const CollectionsClass = Collections;