import MovieListGenerator from 'scenes/CollectionMovies/services/listGenerator'
import MovieStreamGenerator from 'scenes/CollectionMovies/services/streamGenerator'

export const getListGenerator = (scene) => {
  switch(scene) {
    case 'movies':
      return MovieListGenerator;
  }
};

export const getStreamGenerator = (scene) => {
  switch(scene) {
    case 'movies':
      return MovieStreamGenerator;
  }
};