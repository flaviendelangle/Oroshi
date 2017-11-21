import API  from './index'
import { TVShowsClass } from './tvShows'

class TVShowCollections extends API {
  
  config = {
    root: '/tv_show_collections'
  };
  
  nested_routes = {
    tv_shows: TVShowsClass
  };
  
  settings = pk => {
    if (pk) {
      return super.detail_route(pk, 'settings');
    }
    return super.list_route('settings');
  }
  
}


export const TVShowCollectionsAPI = new TVShowCollections();
export const TVShowCollectionsClass = TVShowCollections;