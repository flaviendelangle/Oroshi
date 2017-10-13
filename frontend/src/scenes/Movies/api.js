import API from '../../containers/api'

export class MoviesAPI extends API {
  
  static config = {
    root: '/movies/'
  };
  
  static list = () => {
    return API.GET(MoviesAPI.config.url);
  };
  
  static create = (body) => {
    return DirectorsAPI.retrieveOrCreate(body.directors).then((response) => {
      const directors = response.map((director) => {
        return director.pk;
      });
      return API.create(MoviesAPI, {
        ...body,
        directors
      });
    });
  };
  
}


export class DirectorsAPI extends  API {

  static config = {
    root: '/directors/'
  };
  
  static create = (body) => {
    return API.create(DirectorsAPI, body);
  };

  static retrieveOrCreate = (name) => {
    const body = {
      name
    };
    return API.retrieveOrCreate(DirectorsAPI, 'name', body);
  };
  
  
  
  
  
}

