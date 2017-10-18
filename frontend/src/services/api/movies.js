import API from './index'
import { DirectorsAPI } from './directors';

class Movies extends API {
  
  config = {
    root: '/movies'
  };
  
  create = (body) => {
    if(this.root) { // We are in a nested route so we just want to send the pk of the movie to add it
      return super.create(body);
    }
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



export const MoviesAPI = new Movies();
export const MoviesClass = Movies;
