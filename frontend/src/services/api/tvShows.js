import API from './index'
import { DirectorsAPI } from './directors'
import { GenresAPI } from './genres'

class TVShows extends API {
  
  config = {
    root: '/tv_shows'
  };
  
  create = body => {
    if(this.root) { // We are in a nested route so we just want to send the pk of the movie to add it
      return super.create(body);
    }
    let directors, genres;
    return DirectorsAPI.retrieveOrCreate(body.directors)
      .then(response => {
        directors = response.map(director => director.pk);
        return GenresAPI.retrieveOrCreate(body.genres);
      })
      .then(response => {
        genres = response.map(genre => genre.pk);
        return super.create({
          ...body,
          directors,
          genres
        });
      });
  };
  
}



export const TVShowsAPI = new TVShows();
export const TVShowsClass = TVShows;
