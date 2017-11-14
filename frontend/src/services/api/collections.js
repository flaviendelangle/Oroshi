import API  from './index'

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


