import API from './index'

class Collections extends API {
  config = {
    root: '/collections',
  };

  settings = pk => super.detailRoute(pk, 'settings');
}

export const CollectionsAPI = new Collections();
export const CollectionsClass = Collections;
