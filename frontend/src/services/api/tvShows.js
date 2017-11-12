import API from './index'
import { NetworksAPI } from './networks'
import { GenresAPI } from './genres'

class TVShows extends API {
  
  config = {
    root: '/tv_shows'
  };
  
  create = body => {
    if(this.root) { // We are in a nested route so we just want to send the pk of the movie to add it
      return super.create(body);
    }
    let networks, genres;
    console.log(body);
    return NetworksAPI.retrieveOrCreate(body.networks)
      .then(response => {
        networks = response.map(director => director.pk);
        return GenresAPI.retrieveOrCreate(body.genres);
      })
      .then(response => {
        genres = response.map(genre => genre.pk);
        return super.create({
          ...body,
          networks,
          genres
        });
      });
  };
  
}



export const TVShowsAPI = new TVShows();
export const TVShowsClass = TVShows;
