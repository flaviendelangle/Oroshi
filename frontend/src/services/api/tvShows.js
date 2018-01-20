import API from './index'
import { NetworksAPI } from './networks'
import { GenresAPI } from './genres'

class TVShows extends API {
  
  config = {
    root: '/tv_shows'
  };
  
  create = (body) => {
    if (this.root) { // We are in a nested route so we just want to send the pk of the movie to add it
      return super.create(body);
    }
    let networks, genres;
    return NetworksAPI.retrieveOrCreate(body.networks)
      .then((response) => {
        networks = response.map((director) => director.pk);
        return GenresAPI.retrieveOrCreate(body.genres);
      })
      .then((response) => {
        genres = response.map((genre) => genre.pk);
        return super.create({
          ...body,
          networks,
          genres
        });
      });
  };
  
  addTitle = (tv_show, language, title) => {
    return super.detail_route(tv_show, 'title', 'POST', { language, title });
  };
  
  addPoster = (tv_show, language, path) => {
    return super.detail_route(tv_show, 'poster', 'POST', { language, path });
  };
  
}



export const TVShowsAPI = new TVShows();
export const TVShowsClass = TVShows;
