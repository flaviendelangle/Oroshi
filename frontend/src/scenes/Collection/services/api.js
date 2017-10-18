import API, { nested_class } from '../../../containers/api'
import { MoviesClass } from '../../Movies/services/api'

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