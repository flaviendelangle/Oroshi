const seenAdder = {
  
  movies: (movies, seen) => {
    return movies.map(movie => {
      const matches = seen.filter(seen => {
        return seen.movie === movie.pk;
      });
      return {
        ...movie,
        seen: matches.length > 0
      };
    });
  }
  
};

const collectionAdder = {
  
  movies: (movies, pk) => {
    return movies.map(movie => {
      return {
        ...movie,
        collection: pk
      }
    });
  }
  
};

const preparators = {
  
  movies: data => {
    data.movies = seenAdder.movies(data.movies, data.seen);
    data.movies = collectionAdder.movies(data.movies, data.pk);
    return data
  }
};




export const addSeenToElements =  (scene, movies, seen) => {
  return seenAdder[scene](movies, seen);
};

export const addCollectionToElements = (scene, movies, pk) => {
  return collectionAdder[scene](movies, pk);
};

export const prepareElements = (scene, data) => {
  return preparators[scene](data);
};

