import { combineReducers } from 'redux';

import { collectionContent } from "services/titles/api";


const defaultState = {};

const defaultElementState = {
  loaded: false,
  collection: null,
  suggestions: {
    results: []
  }
};

const main = (state = defaultState, action) => {
  
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
    switch(action.type) {
      
      case collectionContent.loadSettings + '_FULFILLED':
        return {
          ...sceneState,
          loaded: true,
          collection: action.payload
        };
        
      case collectionContent.loadSuggestions + '_FULFILLED':
        return {
          ...sceneState,
          suggestions: action.payload
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


export default combineReducers({
  main
});