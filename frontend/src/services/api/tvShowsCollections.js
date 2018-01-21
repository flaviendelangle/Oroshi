import API from './index'
import { TVShowsClass } from './tvShows'


class TVShowCollections extends API {
  config = {
    root: '/tv_show_collections',
  };

  nestedRoutes = {
    tv_shows: TVShowsClass,
  };

  settings = (pk) => {
    if (pk) {
      return super.detailRoute(pk, 'settings');
    }
    return super.listRoute('settings');
  }
}

export const TVShowCollectionsAPI = new TVShowCollections();
export const TVShowCollectionsClass = TVShowCollections;
