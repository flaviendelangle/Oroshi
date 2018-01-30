import API from './index'
import { DirectorsAPI } from './directors'
import { GenresAPI } from './genres'

class Movies extends API {
  config = {
    root: '/movies',
  };

  create = (body) => {
    if (this.root) { // We are in a nested route
      return super.create(body);
    }

    let directors;
    let genres;

    return DirectorsAPI.retrieveOrCreate(body.directors)
      .then((response) => {
        directors = response.map(director => director.pk);
        return GenresAPI.retrieveOrCreate(body.genres);
      })
      .then((response) => {
        genres = response.map(genre => genre.pk);
        return super.create({
          ...body,
          directors,
          genres,
        });
      });
  };

  addTitle = (movie, language, title) => (
    super.detailRoute(movie, 'title', 'POST', { language, title })
  );

  addPoster = (movie, language, path) => (
    super.detailRoute(movie, 'poster', 'POST', { language, path })
  );
}


export const MoviesAPI = new Movies();
export const MoviesClass = Movies;
