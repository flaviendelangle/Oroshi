import API from '../../../containers/api'

class Movies extends API {
  
  config = {
    root: '/movies/'
  };
  
  create = (body) => {
    return DirectorsAPI.retrieveOrCreate(body.directors).then((response) => {
      const directors = response.map((director) => {
        return director.pk;
      });
      return super.create({
        ...body,
        directors
      });
    });
  };
  
}

class Directors extends API {

  config = {
    root: '/directors/'
  };

  retrieveOrCreate = (body) => {
    return super.retrieveOrCreate(body, 'tmdbId');
  };
  
}

export const MoviesAPI = new Movies();
export const DirectorsAPI = new Directors();