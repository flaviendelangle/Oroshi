import API  from './index'
import { MoviesClass } from './movies'

class Collections extends API {
  
  config = {
    root: '/collections'
  };
  
  nested_routes = {
    movies: MoviesClass
  };
  
}


export const CollectionsAPI = new Collections();
export const CollectionsClass = Collections;