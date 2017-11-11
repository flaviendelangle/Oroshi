import API  from './index'
import { MovieCollectionsAPI } from './movieCollections';
import { TVShowCollectionsAPI } from './tvShowsCollections';
import { MoviesAPI } from './movies'
import { TVShowsAPI } from './tvShows'

class Collections extends API {
  
  config = {
    root: '/collections'
  };
  
  settings = () => {
    return super.list_route('settings');
  }
  
}


export const CollectionsAPI = new Collections();
export const CollectionsClass = Collections;


export const getCollectionAPI = (scene) => {
  switch(scene) {
    case 'movies':
      return MovieCollectionsAPI;
    
    case 'tv_shows':
      return TVShowCollectionsAPI;
      
    default:
      return null;
  }
};

export const getElementAPI = (scene) => {
  switch(scene) {
    case 'movies':
      return MoviesAPI;
    
    case 'tv_shows':
      return TVShowsAPI;
    
    default:
      return null;
  }
};