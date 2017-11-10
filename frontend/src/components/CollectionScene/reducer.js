import { combineReducers } from 'redux'

import dialogAddElement from '../DialogAddElement/reducer'
import menu from '../CollectionMenu/reducer'
import header from '../CollectionHeader/reducer'

import { collectionContent, collections } from 'services/titles/api'
import { sort, search } from 'services/titles/data'
import { layout } from 'services/titles/interface'
import { getValue } from 'services/localstorage'
import api from 'services/TheMovieDatabaseJS/index'

import { sortElements, setSortParameters, setLayoutParameters } from 'scenes/CollectionMovies/services/utils'
import StreamGenerator from 'scenes/CollectionMovies/services/streamgenerator'
import Search from 'scenes/CollectionMovies/services/search'
import { addSeenToElements, addCollectionToElements } from 'scenes/CollectionSettings/services/utils'

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


const reducerBuilder = _scene => {
  
  const scene = _scene;
  
  const main = (state = defaultState, action) => {
    
    if(action.scene && action.scene !== scene) {
      console.log('STATE REJECTED', action);
      return state;
    }
    
    let newContent, newOrder;
    
    switch(action.type) {
      
      case collectionContent.load + '_FULFILLED':
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
        newContent = sortElements(action.payload.movies, state.order.default);
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
        newContent = sortElements(
          addCollectionToElements(
            action.scene,
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
        newContent = addSeenToElements(action.scene, state.content, action.payload);
        return {
          ...state,
          content: newContent,
          stream: new StreamGenerator(newContent, state.query, state.order.stream),
          toShow: new Search(newContent, state.query)
        };
      
      case sort.update:
        setSortParameters(action.parameters, defaultOrder);
        if(action.parameters.layout === 'default') {
          newContent = sortElements(state.content, action.parameters);
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
      
      case search.update_query: // OK
        return {
          ...state,
          query: action.query,
          stream: new StreamGenerator(state.content, action.query, state.order.stream),
          toShow: new Search(state.content, action.query)
        };
      
      case layout.update: // OK
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
  
  
  return reducer;
  
};


export default reducerBuilder;