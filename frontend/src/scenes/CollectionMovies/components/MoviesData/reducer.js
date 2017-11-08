import { sort, setSortParameters, setLayoutParameters } from '../../services/utils'
import { addSeenToMovies, addCollectionToMovies } from '../../../CollectionSettings/services/utils'
import { getValue } from 'services/localstorage'

import { collections, collectionsMovies } from 'services/actions/titles/api'
import { movies, search } from 'services/actions/titles/data'
import { layout } from 'services/actions/titles/interface'
import api from 'services/TheMovieDatabaseJS/'
import StreamGenerator from './services/streamgenerator'
import Search from './services/search'

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
  content: [],
  query: '',
  collection: 0,
  found: false,
  loaded: false,
  layout: getValue('layout') || 'grid',
  order: getValue('order') || defaultOrder,
  stream: new StreamGenerator(),
  toShow: new Search()
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
        content: newMovies,
        stream: new StreamGenerator(newMovies, state.query, state.order.stream),
        toShow: new Search(newMovies, state.query),
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
        content: newMovies,
        stream: new StreamGenerator(newMovies, state.query, state.order.stream),
        toShow: new Search(newMovies, state.query)
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
        content: newMovies,
        stream: new StreamGenerator(newMovies, state.query, state.order.stream),
        toShow: new Search(newMovies, state.query)
      };
      
    case collectionsMovies.update + '_FULFILLED':
      newMovies = addSeenToMovies(state.movies, action.payload);
      return {
        ...state,
        content: newMovies,
        stream: new StreamGenerator(newMovies, state.query, state.order.stream),
        toShow: new Search(newMovies, state.query)
      };
      
    case movies.sort:
      setSortParameters(action.parameters, defaultOrder);
      if(action.parameters.layout === 'default') {
        newMovies = sort(state.content, action.parameters);
      } else {
        newMovies = state.content;
      }
      newOrder = {
        ...state.order,
        [action.parameters.layout]: action.parameters
      };
      return {
        ...state,
        order: newOrder,
        content: newMovies,
        stream: new StreamGenerator(newMovies, state.query, newOrder.stream),
        toShow: new Search(newMovies, state.query),
        update: Math.random()
      };
      
    case search.update_query:
      return {
        ...state,
        query: action.query,
        stream: new StreamGenerator(state.content, action.query, state.order.stream),
        toShow: new Search(state.content, action.query)
      };
      
    case layout.update:
      setLayoutParameters(action.layout);
      return {
        ...state,
        query: '',
        layout: action.layout,
        stream: new StreamGenerator(state.content, '', state.order.stream),
        toShow: new Search(state.content, '')
      };
      
    default:
      return state;
  }
  
};

export default moviesDataReducer;