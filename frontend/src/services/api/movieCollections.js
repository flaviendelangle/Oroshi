import API  from './index'
import { MoviesClass } from './movies'

class MovieCollections extends API {
  
  config = {
    root: '/movie_collections'
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


export const MovieCollectionsAPI = new MovieCollections();
export const MovieCollectionsClass = MovieCollections;