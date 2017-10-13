export const synchronizeMovies = (movies) => {
  return {
    type: 'UPDATE_MOVIES',
    movies
  };
};
