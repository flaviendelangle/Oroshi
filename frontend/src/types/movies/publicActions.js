import * as tmdb from 'services/actions/publicAPI/tmdb';
import PersonAPI from 'services/TheMovieDatabaseJS/person';
import Element from 'services/content/element';

export const search = tmdb.search;

export const getRecommendations = tmdb.getRecommendations;

export const getSuggestions = (scene, collection, element) => {
  const promises = [
    ..._getElementsSameDirectors(scene, collection, element)
  ];
  return tmdb.getSuggestions(scene, collection, element, promises);
};

export const getPopular = tmdb.getPopular;

export const getTopRated = tmdb.getTopRated;

export const checkExistence = tmdb.checkExistence;

export const getDetails = tmdb.getDetails;

export const getTitle = tmdb.getTitle;

export const getPoster = tmdb.getPoster;

export const cleanDetails = (scene, details) => {
  const directors = details.credits.crew
    .filter(el => el.job === 'Director')
    .map(el => ({ tmdbId: el.id, name: el.name }));
  
  const genres = details.genres
    .map(({id, name}) => ({tmdbId: id, name}));

  return {
    directors,
    genres,
    tmdbId: details.id,
    note: details.vote_average,
    posters: details.posters,
    titles: details.titles,
    release: details.release_date,
    original_language: details.original_language
  };
};

export const _getElementsSameDirectors = (scene, collection, element) => {
  return element.getDirectors().map(director => {
    return PersonAPI.movieCredits(director.tmdbId).then(response => {
      const results = response.crew.filter(el => el.job === 'Director');
      return tmdb.prepareSearchResults(scene, collection, { results })
        .then(el => ({
          key: { name: `Directed by ${director.name}`, pk: director.tmdbId },
          type: 'same_director',
          content: Element.sortList(el.results, {
            field: 'note',
            direction: 'desc'
          }),
          link: false
        }));
    });
  });
};