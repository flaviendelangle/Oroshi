import { sort, setSortParameters, setLayoutParameters } from '../../services/utils'
import { addSeenToMovies, addCollectionToMovies } from '../../../CollectionSettings/services/utils'
import { getValue } from '../../../../services/localstorage'

import { collections, collectionsMovies } from '../../../../services/actions/titles/api'
import { movies } from '../../../../services/actions/titles/data'
import api from '../../../../services/TheMovieDatabaseJS/'
import StreamGenerator from './services/streamgenerator'

const defaultOrder = {
  default: {
    field: 'title',
    direction: 'asc'
  },
  stream: {
    field: 'directors',
    direction: 'desc'
  }
};

const defaultState = {
  movies: [],
  query: '',
  collection: 0,
  found: false,
  loaded: false,
  layout: getValue('layout') || 'grid',
  order: getValue('order') || defaultOrder,
  stream: new StreamGenerator()
};

const moviesDataReducer = (state = defaultState, action) => {
  let newMovies, newOrder;
  
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
      newMovies = sort(action.payload.movies, state.order.default);
      return {
        ...state,
        collection: action.payload.pk,
        movies: newMovies,
        stream: new StreamGenerator(newMovies, state.query, state.order.stream),
        found: true,
        loaded: true
      };
      
    case collectionsMovies.add + '_FULFILLED':
      newMovies = sort(
        addCollectionToMovies(
          state.movies.concat([action.payload]),
          state.collection
        ), state.order.default
      );
      return {
        ...state,
        movies: newMovies,
        stream: new StreamGenerator(newMovies, state.query, state.order.stream)
      };
      
    case collectionsMovies.remove + '_FULFILLED':
      const match = state.movies.filter(el => {
        return el.pk === action.payload.pk
      });
      if(match.length === 0) {
        return state;
      }
      const index = state.movies.indexOf(match[0]);
      newMovies = [
        ...state.movies.slice(0, index),
        ...state.movies.slice(index + 1)
      ];
      return {
        ...state,
        movies: newMovies,
        stream: new StreamGenerator(newMovies, state.query, state.order.stream)
      };
      
    case collectionsMovies.update + '_FULFILLED':
      newMovies = addSeenToMovies(state.movies, action.payload);
      return {
        ...state,
        movies: newMovies,
        stream: new StreamGenerator(newMovies, state.query, state.order.stream)
      };
      
    case movies.sort:
      setSortParameters(action.parameters, defaultOrder);
      if(action.parameters.layout === 'default') {
        newMovies = sort(state.movies, action.parameters);
      } else {
        newMovies = state.movies;
      }
      newOrder = {
        ...state.order,
        [action.parameters.layout]: action.parameters
      };
      return {
        ...state,
        order: newOrder,
        movies: newMovies,
        stream: new StreamGenerator(newMovies, state.query, newOrder.stream),
        update: Math.random()
      };
      
    case movies.update_search_query:
      return {
        ...state,
        query: action.query,
        stream: new StreamGenerator(state.movies, action.query, state.order.stream),
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