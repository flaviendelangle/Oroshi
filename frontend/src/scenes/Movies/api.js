import API from '../../containers/api'

class MoviesAPI extends API {
  
  static config = {
    url: API.config.url + '/movies/'
  };
  
  static list = () => {
    return API.GET(MoviesAPI.config.url);
  }
  
}

export default MoviesAPI;