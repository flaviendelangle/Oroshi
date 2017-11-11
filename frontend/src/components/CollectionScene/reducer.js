import { combineReducers } from 'redux'

import dialogAddElement from './components/DialogAddElement/reducer'
import menu from './components/Menu/reducer'
import header from './components/Header/reducer'

import { collectionContent, collections } from 'services/titles/api'
import { sort, search } from 'services/titles/data'
import { layout } from 'services/titles/interface'
import { getValue } from 'services/localstorage'
import api from 'services/TheMovieDatabaseJS/index'
import { getListGenerator, getStreamGenerator } from 'services/content/'

import { sortElements, setSortParameters, setLayoutParameters } from 'scenes/CollectionMovies/services/utils'
import { addSeenToElements, addCollectionToElements } from 'scenes/CollectionSettings/services/utils'

const reducerBuilder = _scene => {
  
  const ListGenerator = getListGenerator(_scene);
  const StreamGenerator = getStreamGenerator(_scene);
  
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
    toShow: new ListGenerator()
  };
  
  
  const main = (scene, state = defaultState, action) => {
    if(action.meta && action.meta.scene && action.meta.scene !== scene) {
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
        newContent = sortElements(action.payload.content, state.order.default);
        return {
          ...state,
          collection: action.payload.pk,
          content: newContent,
          stream: new StreamGenerator(newContent, state.query, state.order.stream),
          toShow: new ListGenerator(newContent, state.query),
          found: true,
          loaded: true
        };
      
      case collections.add + '_FULFILLED':
        newContent = sortElements(
          addCollectionToElements(
            action.meta.scene,
            state.content.concat([action.payload]),
            state.collection
          ), state.order.default
        );
        return {
          ...state,
          content: newContent,
          stream: new StreamGenerator(newContent, state.query, state.order.stream),
          toShow: new ListGenerator(newContent, state.query)
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
          toShow: new ListGenerator(newContent, state.query)
        };
      
      case collections.update + '_FULFILLED':
        newContent = addSeenToElements(action.meta.scene, state.content, action.payload);
        return {
          ...state,
          content: newContent,
          stream: new StreamGenerator(newContent, state.query, state.order.stream),
          toShow: new ListGenerator(newContent, state.query)
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
          toShow: new ListGenerator(newContent, state.query),
          update: Math.random()
        };
      
      case search.update_query: // OK
        return {
          ...state,
          query: action.query,
          stream: new StreamGenerator(state.content, action.query, state.order.stream),
          toShow: new ListGenerator(state.content, action.query)
        };
      
      case layout.update: // OK
        setLayoutParameters(action.layout);
        return {
          ...state,
          query: '',
          layout: action.layout,
          stream: new StreamGenerator(state.content, '', state.order.stream),
          toShow: new ListGenerator(state.content, '')
        };
      
      default:
        return state;
    }
    
  };
  
  return combineReducers({
    main: main.bind(this, _scene),
    menu,
    dialogAddElement,
    header,
  });
  
};


export default reducerBuilder;