import { combineReducers } from 'redux';

import header from './components/Header/reducer';

import { collectionContent, collections } from 'services/titles/api';
import { sort, search } from 'services/titles/data';
import * as publicAPI from 'services/titles/publicAPI';
import { layout, source } from 'services/titles/interface';
import { getValue } from 'services/localstorage';
import TMDBAPI from 'services/TheMovieDatabaseJS/index';
import { getListGenerator, getStreamGenerator, getDefaultOrder } from 'services/content/';

import { sortElements, setSortParameters, setLayoutParameters, mergeRecommendations, mergeSearch } from './services/utils';
import { addSeenToElements, addCollectionToElements } from 'services/actions/collections';

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
    addingSearch: null
  };
  
  
  const main = (scene, state = defaultState, action) => {
    
    if(action.meta && action.meta.scene && action.meta.scene !== scene) {
      return state;
    }
    
    let newContent, newOrder,  newRecommendations;
    
    switch(action.type) {
      
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
      
      case collections.add + '_FULFILLED':
        
        let newSearchResults;
        if(state.addingSearch) {
          newSearchResults = {
            ...state.addingSearch,
            results: state.addingSearch.results.map(el => {
              if(el.id === action.payload.tmdbId) {
                el.already_in_collection = true;
              }
              return el;
            })
          }
        } else {
          newSearchResults = null;
        }
        // state.recommendations.results[i].content
        newRecommendations = {
          ...state.recommendations,
          results: state.recommendations.results.map(section => {
            return {
              ...section,
              content: section.content.map(el => {
                if(el.id === action.payload.tmdbId) {
                  el.already_in_collection = true;
                }
                return el;
              })
            }
          })
        };

  
        newContent = sortElements(
          addCollectionToElements(
            scene,
            state.content.concat([action.payload]),
            state.collection
          ), state.order.default
        );
        return {
          ...state,
          content: newContent,
          stream: new StreamGenerator(newContent, state.query, state.order.stream),
          toShow: new ListGenerator(newContent, state.query),
          recommendations: newRecommendations,
          addingSearch: newSearchResults
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
        newContent = addSeenToElements(scene, state.content, action.payload);
        return {
          ...state,
          content: newContent,
          stream: new StreamGenerator(newContent, state.query, state.order.stream),
          toShow: new ListGenerator(newContent, state.query)
        };
      
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
      
      case layout.update:
        setLayoutParameters(scene, action.layout);
        return {
          ...state,
          query: '',
          layout: action.layout,
          stream: new StreamGenerator(state.content, '', state.order.stream),
          toShow: new ListGenerator(state.content, '')
        };
        
      case source.updateIsAdding:
        
        return {
          ...state,
          addingSearch: null,
          isAdding: !state.isAdding
        };
        
      case publicAPI.request.get_recommendations + '_FULFILLED':
        return {
          ...state,
          recommendations: action.payload
        };
        
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