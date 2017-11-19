import { combineReducers } from 'redux';

import header from './components/Header/reducer';

import { collectionContent, collections } from 'services/titles/api';
import { sort, search } from 'services/titles/data';
import * as publicAPI from 'services/titles/publicAPI';
import { screen, layout, source } from 'services/titles/interface';
import { getValue } from 'services/localstorage';
import TMDBAPI from 'services/TheMovieDatabaseJS/index';
import { getListGenerator, getStreamGenerator, getDefaultOrder } from 'services/content/';

import { sortElements, setSortParameters, setLayoutParameters, mergeRecommendations, mergeSearch } from './services/utils';
import { addSeenToElements, addCollectionToElement } from 'services/actions/collections';
import * as adding_search_manager from './services/adding_search_manager';
import * as recommendations_manager from './services/recommendations_manager';
import * as content_manager from './services/content_manager';

const reducerBuilder = _scene => {
  
  const ListGenerator = getListGenerator(_scene);
  const StreamGenerator = getStreamGenerator(_scene);
  
  const defaultOrder = getDefaultOrder(_scene);
  
  const defaultState = {
    content: [],
    query: '',
    collection: null,
    found: false,
    loaded: false,
    layout: getValue('layout_' + _scene) || 'grid',
    order: getValue('order_' + _scene) || defaultOrder,
    stream: new StreamGenerator(),
    toShow: new ListGenerator(),
    
    // Adding mode
    isAdding: false,
    recommendations: {
      results: []
    },
    addingSearch: null,
    
  };
  
  
  const main = (scene, state = defaultState, action) => {
    
    if(action.meta && action.meta.scene && action.meta.scene !== scene) {
      return state;
    }
    
    let newContent, newOrder,  newRecommendations, newState, newElement;
    
    switch(action.type) {
  
      /**
       * The collection has been loaded
       */
      case collectionContent.load + '_FULFILLED':
        if(!action.payload) {
          return {
            ...state,
            found: false,
            loaded: true
          }
        }
        TMDBAPI.set_config({
          include_adult: action.payload.adult_content,
          language: action.payload.title_language
        });
        newContent = sortElements(
          action.payload.content,
          state.order.default
        );
        return {
          ...state,
          collection: action.payload,
          content: newContent,
          stream: new StreamGenerator(newContent, state.query, state.order.stream),
          toShow: new ListGenerator(newContent, state.query),
          found: true,
          loaded: true
        };
  
      /**
       * An element has been added to the collection
       */
      case collections.add + '_FULFILLED':
        newElement = addCollectionToElement(action.payload, state.collection);
        
        newState = adding_search_manager.add(state, newElement);
        newState = recommendations_manager.add(state, newElement);
  
        newContent = content_manager.add(state.content, newElement, state.order.default);
        
        return {
          ...newState,
          content: newContent,
          stream: new StreamGenerator(newContent, state.query, state.order.stream),
          toShow: new ListGenerator(newContent, state.query)
        };
  
      /**
       * An element has been removed from the collection
       */
      case collections.remove + '_FULFILLED':
        newElement = action.payload;
        
        newState = adding_search_manager.remove(state, newElement);
        newState = recommendations_manager.remove(state, newElement);
        
        newContent = content_manager.remove(state.content, newElement);
        
        return {
          ...state,
          content: newContent,
          stream: new StreamGenerator(newContent, state.query, state.order.stream),
          toShow: new ListGenerator(newContent, state.query),
        };
  
      /**
       * An element has been updated in the collection (ex : Not Seen => Seen)
       */
      case collections.update + '_FULFILLED':
        newContent = addSeenToElements(scene, state.content, action.payload);
        return {
          ...state,
          content: newContent,
          stream: new StreamGenerator(newContent, state.query, state.order.stream),
          toShow: new ListGenerator(newContent, state.query)
        };
  
  
      /**
       * The order of the elements has been updated (check OrderMenu component)
       */
      case sort.update:
        setSortParameters(scene, action.parameters, defaultOrder);
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
  
      /**
       * The search query has been updated (check Header's Search component)
       */
      case search.update_query:
        if(this.isAdding) {
          return state;
        }
        return {
          ...state,
          query: action.query,
          stream: new StreamGenerator(state.content, action.query, state.order.stream),
          toShow: new ListGenerator(state.content, action.query)
        };
  
      /**
       * The layout in which we want to see the elements has been updated
       */
      case layout.update:
        setLayoutParameters(scene, action.layout);
        return {
          ...state,
          query: '',
          layout: action.layout,
          stream: new StreamGenerator(state.content, '', state.order.stream),
          toShow: new ListGenerator(state.content, '')
        };
  
      /**
       * We enter / leave the adding more
       */
      case source.updateIsAdding:
        
        return {
          ...state,
          addingSearch: null,
          isAdding: !state.isAdding
        };
  
      /**
       * The recommendations for the adding mode (i.e Top Rated + Popular) has been loaded
       */
      case publicAPI.request.get_recommendations + '_FULFILLED':
        return {
          ...state,
          recommendations: action.payload
        };
  
      /**
       * A new page of the popular movies has been loaded
       */
      case publicAPI.request.get_popular + '_FULFILLED':
        if(!state.isAdding) {
          return state;
        }
        newRecommendations = mergeRecommendations(
          state.recommendations,
          action.payload,
          'popular'
        );
        return {
          ...state,
          recommendations: newRecommendations
        };
  
      /**
       * A new page of the top rated movies has been loaded
       */
      case publicAPI.request.get_top_rated + '_FULFILLED':
        if(!state.isAdding) {
          return state;
        }
        newRecommendations = mergeRecommendations(
          state.recommendations,
          action.payload,
          'top_rated'
        );
        return {
          ...state,
          recommendations: newRecommendations
        };
  
      /**
       * A search to the public API has been completed (used only in Adding Mode)
       */
      case publicAPI.request.search + '_FULFILLED':
        return {
          ...state,
          addingSearch: mergeSearch(
            state.addingSearch,
            action.payload
          )
        };
      
      default:
        return state;
    }
    
  };
  
  return combineReducers({
    main: main.bind(this, _scene),
    header,
  });
  
};


export default reducerBuilder;