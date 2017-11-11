import API  from './index'
import { MovieCollectionsAPI } from './movieCollections';
import { TVShowCollectionsAPI } from './tvShowsCollections';

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
  console.log(scene);
  switch(scene) {
    case 'movies':
      return MovieCollectionsAPI;
    
    case 'tv_shows':
      return TVShowCollectionsAPI;
      
    default:
      return null;
  }
};