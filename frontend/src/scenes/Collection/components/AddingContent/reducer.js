import { collectionContent, collections } from 'services/titles/api';
import * as publicAPI from 'services/titles/publicAPI';

import * as adding_search_manager from './services/adding_search_manager';
import * as recommendations_manager from './services/recommendations_manager';

  
const defaultState = {};

const defaultElementState = {
  collection: null,
  recommendations: {
    results: []
  },
  addingSearch: null,
  loaded: false
};

const reducer = (state = defaultState, action) => {
  
  if (!action.meta || !action.meta.scene) {
    return state;
  }
  const scene = action.meta.scene;
  
  if (!state[scene]) {
    state = {
      ...state,
      [scene]: defaultElementState
    };
  }
  
  const sceneReducer = sceneState => {
    
    let newElement, newState;

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
       * An component has been added to the collection
       */
      case collections.add + '_FULFILLED':
    
        newState = adding_search_manager.add(sceneState, action.payload);
        newState = recommendations_manager.add(sceneState, action.payload);
    
        return newState;
  
      /**
       * An component has been removed from the collection
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
        newState = recommendations_manager.merge(
          sceneState,
          action.payload,
          'popular'
        );
        return newState;
  
      /**
       * A new page of the top rated movies has been loaded
       */
      case publicAPI.request.get_top_rated + '_FULFILLED':
        newState = recommendations_manager.merge(
          sceneState,
          action.payload,
          'top_rated'
        );
        return newState;
  
      /**
       * A search to the public API has been completed (used only in Adding Mode)
       */
      case publicAPI.request.search + '_FULFILLED':
        return {
          ...sceneState,
          addingSearch: adding_search_manager.merge(sceneState, action.payload)
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