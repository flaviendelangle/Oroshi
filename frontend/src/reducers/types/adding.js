import { collectionContent, collections } from 'services/titles/api';
import * as publicAPI from 'services/titles/publicAPI';

import * as adding_search_manager from '../../scenes/Collection/components/AddingContent/services/adding_search_manager';
import * as recommendations_manager from '../../scenes/Collection/components/AddingContent/services/recommendations_manager';


const defaultState = {
  collection: null,
  recommendations: {
    results: []
  },
  addingSearch: null,
  loaded: false
};

const reducer = (state = defaultState, action) => {
  
  let newElement, newState;
  
  switch(action.type) {
    
    /**
     * The collection has been loaded
     */
    case collectionContent.load + '_FULFILLED':
      return {
        ...state,
        collection: action.payload,
      };
    
    /**
     * An component has been added to the collection
     */
    case collections.add + '_FULFILLED':
      
      newState = adding_search_manager.add(state, action.payload);
      newState = recommendations_manager.add(state, action.payload);
      
      return newState;
    
    /**
     * An component has been removed from the collection
     */
    case collections.remove + '_FULFILLED':
      newElement = action.payload;
      
      newState = adding_search_manager.remove(state, newElement);
      newState = recommendations_manager.remove(state, newElement);
      
      return newState;
    
    /**
     * The recommendations for the adding mode (i.e Top Rated + Popular) has been loaded
     */
    case publicAPI.request.get_recommendations + '_FULFILLED':
      return {
        ...state,
        addingSearch: null,
        recommendations: action.payload,
        loaded: true
      };
    
    /**
     * A new page of the popular movies has been loaded
     */
    case publicAPI.request.get_popular + '_FULFILLED':
      newState = recommendations_manager.merge(
        state,
        action.payload,
        'popular'
      );
      return newState;
    
    /**
     * A new page of the top rated movies has been loaded
     */
    case publicAPI.request.get_top_rated + '_FULFILLED':
      newState = recommendations_manager.merge(
        state,
        action.payload,
        'top_rated'
      );
      return newState;
    
    /**
     * A search to the public API has been completed (used only in Adding Mode)
     */
    case publicAPI.request.search + '_FULFILLED':
      return {
        ...state,
        addingSearch: adding_search_manager.merge(state, action.payload)
      };
    
    default:
      return state;
  }
  
};


export default reducer;