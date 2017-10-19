export const addSeenToMovies = (movies, seen) => {
  return movies.map(movie => {
    const matches = seen.filter(seen => {
      return seen.movie === movie.pk;
    });
    return {
      ...movie,
      seen: matches.length > 0
    };
  });
};

export const addCollectionToMovies = (movies, pk) => {
  return movies.map(movie => {
    return {
      ...movie,
      collection: pk
    }
  });
};

export const prepareMovies = data => {
  data.movies = addSeenToMovies(data.movies, data.seen);
  data.movies = addCollectionToMovies(data.movies, data.pk);
  return data
};

