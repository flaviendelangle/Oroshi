import MovieListGenerator from 'types/movies/listGenerator'
import MovieStreamGenerator from 'types/movies/streamGenerator'

import TVShowListGenerator from 'types/tvShows/listGenerator'
import TVShowStreamGenerator from 'types/tvShows/streamGenerator'


export const getListGenerator = scene => {
  switch(scene) {
    case 'movies':
      return MovieListGenerator;
    case 'tv_shows':
      return TVShowListGenerator;
    default:
      return null;
  }
};

export const getStreamGenerator = scene => {
  switch(scene) {
    case 'movies':
      return MovieStreamGenerator;
    case 'tv_shows':
      return TVShowStreamGenerator;
    default:
      return null;
  }
};

export const getDefaultOrder = scene => {
  
  switch(scene) {
    case 'movies':
      return {
        default: {
          field: 'title',
          direction: 'asc'
        },
        stream: {
          field: 'directors',
          direction: 'desc'
        }
      };
      
    case 'tv_shows':
      return {
        default: {
          field: 'title',
          direction: 'asc'
        },
        stream: {
          field: 'networks',
          direction: 'desc'
        }
      };
    default:
      return null;
  }
  
  
};