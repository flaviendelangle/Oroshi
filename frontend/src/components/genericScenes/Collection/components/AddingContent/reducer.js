import { collectionContent, collections } from 'services/titles/api';
import * as publicAPI from 'services/titles/publicAPI';

import { mergeRecommendations, mergeSearch } from '../../services/utils';
import { addCollectionToElement } from 'services/actions/collections';
import * as adding_search_manager from './services/adding_search_manager';
import * as recommendations_manager from './services/recommendations_manager';

  
const defaultState = {};

const defaultElementState = {
  collection: null,
  isAdding: false,
  recommendations: {
    results: []
  },
  addingSearch: null,
  loaded: false
};

const reducer = (state = defaultState, action) => {
  
  if(!action.meta || !action.meta.scene) {
    return state;
  }
  const scene = action.meta.scene;
  
  if(!state[scene]) {
    state = {
      ...state,
      [scene]: defaultElementState
    };
  }
  
  const sceneReducer = sceneState => {
    
    let newElement, newState, newRecommendations;

    switch(action.type) {
  
      /**
       * The collection has been loaded
       */
      case collectionContent.load + '_FULFILLED':
        return {
          ...sceneState,
          collection: action.payload,
        };
  
      /**
       * An element has been added to the collection
       */
      case collections.add + '_FULFILLED':
        newElement = addCollectionToElement(action.payload, sceneState.collection);
    
        newState = adding_search_manager.add(sceneState, newElement);
        newState = recommendations_manager.add(sceneState, newElement);
    
        return newState;
  
      /**
       * An element has been removed from the collection
       */
      case collections.remove + '_FULFILLED':
        newElement = action.payload;
    
        newState = adding_search_manager.remove(sceneState, newElement);
        newState = recommendations_manager.remove(sceneState, newElement);
    
        return newState;
  
      /**
       * The recommendations for the adding mode (i.e Top Rated + Popular) has been loaded
       */
      case publicAPI.request.get_recommendations + '_FULFILLED':
        return {
          ...sceneState,
          addingSearch: null,
          recommendations: action.payload,
          loaded: true
        };
  
      /**
       * A new page of the popular movies has been loaded
       */
      case publicAPI.request.get_popular + '_FULFILLED':
        if(!sceneState.isAdding) {
          return state;
        }
        newRecommendations = mergeRecommendations(
          state.recommendations,
          action.payload,
          'popular'
        );
        return {
          ...sceneState,
          recommendations: newRecommendations
        };
  
      /**
       * A new page of the top rated movies has been loaded
       */
      case publicAPI.request.get_top_rated + '_FULFILLED':
        newRecommendations = mergeRecommendations(
          sceneState.recommendations,
          action.payload,
          'top_rated'
        );
        return {
          ...sceneState,
          recommendations: newRecommendations
        };
  
      /**
       * A search to the public API has been completed (used only in Adding Mode)
       */
      case publicAPI.request.search + '_FULFILLED':
        return {
          ...sceneState,
          addingSearch: mergeSearch(
            state.addingSearch,
            action.payload
          )
        };
  
      default:
        return sceneState;
    }
    
  };
  
  return {
    ...state,
    [scene]: sceneReducer(state[scene])
  };
  
};


export default reducer;