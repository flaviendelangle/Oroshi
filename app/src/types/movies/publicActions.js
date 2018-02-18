import * as tmdb from 'services/actions/publicAPI/tmdb'
import PersonAPI from 'services/TheMovieDatabaseJS/person'
import Element from 'services/content/element'

export const {
  search,
  getRecommendations,
  getPopular,
  getTopRated,
  checkExistence,
  getDetails,
  getTitle,
  getPoster,
} = tmdb

export const getElementsSameDirectors = (type, collection, element) => (
  element.getDirectors().map(director => (
    PersonAPI.movieCredits(director.tmdbId).then((response) => {
      const results = response.crew.filter(el => el.job === 'Director')
      return tmdb.prepareSearchResults(type, collection, { results })
        .then(el => ({
          key: { name: `Directed by ${director.name}`, pk: director.tmdbId },
          type: 'same_director',
          content: Element.sortList(el.results, {
            field: 'note',
            direction: 'desc',
          }),
          link: false,
        }))
    })
  ))
)

export const getSuggestions = (type, collection, element) => {
  const promises = [
    ...getElementsSameDirectors(type, collection, element),
  ]
  return tmdb.getSuggestions(type, collection, element, promises)
}

export const cleanDetails = (type, details) => {
  const directors = details.credits.crew
    .filter(el => el.job === 'Director')
    .map(el => ({ tmdbId: el.id, name: el.name }))

  const genres = details.genres
    .map(({ id, name }) => ({ tmdbId: id, name }))

  return {
    directors,
    genres,
    tmdbId: details.id,
    note: details.vote_average,
    posters: details.posters,
    titles: details.titles,
    release: details.release_date,
    original_language: details.original_language,
  }
}

