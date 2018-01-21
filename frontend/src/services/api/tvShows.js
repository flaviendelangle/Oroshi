import API from './index'
import { NetworksAPI } from './networks'
import { GenresAPI } from './genres'

class TVShows extends API {
  config = {
    root: '/tv_shows',
  };

  create = (body) => {
    if (this.root) { // We are in a nested route
      return super.create(body);
    }
    let networks;
    let genres;
    return NetworksAPI.retrieveOrCreate(body.networks)
      .then((response) => {
        networks = response.map(director => director.pk);
        return GenresAPI.retrieveOrCreate(body.genres);
      })
      .then((response) => {
        genres = response.map(genre => genre.pk);
        return super.create({
          ...body,
          networks,
          genres,
        });
      });
  };

  addTitle = (tvShow, language, title) => (
    super.detailRoute(tvShow, 'title', 'POST', { language, title })
  );

  addPoster = (tvShow, language, path) => (
    super.detailRoute(tvShow, 'poster', 'POST', { language, path })
  );
}


export const TVShowsAPI = new TVShows();
export const TVShowsClass = TVShows;
