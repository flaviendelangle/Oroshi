import API  from './index'

class Collections extends API {
  
  config = {
    root: '/collections'
  };
  
  settings = (pk) => {
    return super.detail_route(pk, 'settings');
  }
  
}


export const CollectionsAPI = new Collections();
export const CollectionsClass = Collections;


