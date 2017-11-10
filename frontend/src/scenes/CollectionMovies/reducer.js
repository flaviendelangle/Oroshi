import { combineReducers } from 'redux'

import dialogAddElement from '../../components/DialogAddElement/reducer'
import menu from './components/Menu/reducer'
import header from './components/Header/reducer'

import { movieCollections, collections } from 'services/actions/titles/api'
import { movies, search } from 'services/actions/titles/data'
import { layout } from 'services/actions/titles/interface'
import { getValue } from 'services/localstorage'
import api from 'services/TheMovieDatabaseJS/'

import { sort, setSortParameters, setLayoutParameters } from './services/utils'
import StreamGenerator from './services/streamgenerator'
import Search from './services/search'
import { addSeenToMovies, addCollectionToMovies } from '../CollectionSettings/services/utils'

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

const main = (state = defaultState, action) => {
  let newContent, newOrder;
  
  switch(action.type) {
    
    case movieCollections.load + '_FULFILLED':
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
      newContent = sort(action.payload.movies, state.order.default);
      return {
        ...state,
        collection: action.payload.pk,
        content: newContent,
        stream: new StreamGenerator(newContent, state.query, state.order.stream),
        toShow: new Search(newContent, state.query),
        found: true,
        loaded: true
      };
    
    case collections.add + '_FULFILLED':
      newContent = sort(
        addCollectionToMovies(
          state.content.concat([action.payload]),
          state.collection
        ), state.order.default
      );
      return {
        ...state,
        content: newContent,
        stream: new StreamGenerator(newContent, state.query, state.order.stream),
        toShow: new Search(newContent, state.query)
      };
    
    case collections.remove + '_FULFILLED':
      const match = state.content.filter(el => {
        return el.pk === action.payload.pk
      });
      if(match.length === 0) {
        return state;
      }
      const index = state.content.indexOf(match[0]);
      newContent = [
        ...state.content.slice(0, index),
        ...state.content.slice(index + 1)
      ];
      return {
        ...state,
        content: newContent,
        stream: new StreamGenerator(newContent, state.query, state.order.stream),
        toShow: new Search(newContent, state.query)
      };
    
    case collections.update + '_FULFILLED':
      newContent = addSeenToMovies(state.content, action.payload);
      return {
        ...state,
        content: newContent,
        stream: new StreamGenerator(newContent, state.query, state.order.stream),
        toShow: new Search(newContent, state.query)
      };
    
    case movies.sort:
      setSortParameters(action.parameters, defaultOrder);
      if(action.parameters.layout === 'default') {
        newContent = sort(state.content, action.parameters);
      } else {
        newContent = state.content;
      }
      newOrder = {
        ...state.order,
        [action.parameters.layout]: action.parameters
      };
      return {
        ...state,
        order: newOrder,
        content: newContent,
        stream: new StreamGenerator(newContent, state.query, newOrder.stream),
        toShow: new Search(newContent, state.query),
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

const reducer = combineReducers({
  main,
  menu,
  dialogAddElement,
  header,
});


export default reducer;