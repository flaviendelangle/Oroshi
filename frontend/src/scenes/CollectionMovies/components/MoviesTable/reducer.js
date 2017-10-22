import { sort, setSortParameters } from '../../services/utils'
import { addSeenToMovies, addCollectionToMovies } from '../../../CollectionSettings/services/utils'

import { collections, collectionsMovies } from '../../../../services/actions/titles/api'
import { movies } from '../../../../services/actions/titles/data'

const defaultState = {
  movies: [],
  collection: 0,
  found: false,
  loaded: false,
  layout: 'grid'
};

const moviesTableReducer = (state = defaultState, action) => {
  switch(action.type) {
    
    case collections.load + '_FULFILLED':
      if(!action.payload) {
        return {
          ...state,
          found: false,
          loaded: true
        }
      }
      return {
        ...state,
        collection: action.payload.pk,
        movies: sort(action.payload.movies),
        found: true,
        loaded: true
      };
      
    case collectionsMovies.add + '_FULFILLED':
      return {
        ...state,
        movies: sort(addCollectionToMovies(state.movies.concat([action.payload]), state.collection))
      };
      
    case collectionsMovies.update + '_FULFILLED':
      return {
        ...state,
        movies: addSeenToMovies(state.movies, action.payload)
      };
      
    case movies.sort:
      setSortParameters(action.parameters);
      return {
        ...state,
        movies: sort(state.movies),
        update: Math.random()
      };
      
    case movies.update_layout:
      return {
        ...state,
        layout: action.layout
      };
      
    default:
      return state;
  }
  
};

export default moviesTableReducer;