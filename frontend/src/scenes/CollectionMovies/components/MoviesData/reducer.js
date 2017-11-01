import { sort, setSortParameters, setLayoutParameters } from '../../services/utils'
import { addSeenToMovies, addCollectionToMovies } from '../../../CollectionSettings/services/utils'
import { getValue } from '../../../../services/localstorage'

import { collections, collectionsMovies } from '../../../../services/actions/titles/api'
import { movies } from '../../../../services/actions/titles/data'
import api from '../../../../services/TheMovieDatabaseJS/'

const defaultOrder = {
  field: 'title',
  direction: 'asc'
};

const defaultState = {
  movies: [],
  query: '',
  collection: 0,
  found: false,
  loaded: false,
  layout: getValue('layout') || 'grid',
  order: getValue('order') || defaultOrder
};

const moviesDataReducer = (state = defaultState, action) => {

  switch(action.type) {
    
    case collections.load + '_FULFILLED':
      if(!action.payload) {
        return {
          ...state,
          found: false,
          loaded: true
        }
      }
      api.set_config({
        include_adult: action.payload.adult_content
      });
      return {
        ...state,
        collection: action.payload.pk,
        movies: sort(action.payload.movies, state.order),
        found: true,
        loaded: true
      };
      
    case collectionsMovies.add + '_FULFILLED':
      return {
        ...state,
        movies: sort(addCollectionToMovies(state.movies.concat([action.payload]), state.collection))
      };
      
    case collectionsMovies.remove + '_FULFILLED':
      const match = state.movies.filter(el => {
        return el.pk === action.payload.pk
      });
      if(match.length === 0) {
        return state;
      }
      const index = state.movies.indexOf(match[0]);
      return {
        ...state,
        movies: [
          ...state.movies.slice(0, index),
          ...state.movies.slice(index + 1)
        ]
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
        order: action.parameters,
        movies: sort(state.movies, action.parameters),
        update: Math.random()
      };
      
    case movies.update_search_query:
      return {
        ...state,
        query: action.query
      };
      
    case movies.update_layout:
      setLayoutParameters(action.layout);
      return {
        ...state,
        layout: action.layout
      };
      
    default:
      return state;
  }
  
};

export default moviesDataReducer;