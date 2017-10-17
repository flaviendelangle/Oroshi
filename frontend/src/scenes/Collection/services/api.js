import API from '../../../containers/api'

class Collections extends API {
  
  config = {
    root: '/collections/'
  };
  
}

export const CollectionsAPI = new Collections();