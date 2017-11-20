import { combineReducers } from 'redux';

import header from './components/Header/reducer';
import content from './components/CollectionContent/reducer';
import addingContent from './components/AddingContent/reducer';

import { source } from 'services/titles/interface';


const defaultState = {};

const defaultElementState = {
  isAdding: false
};

const main = (state = defaultState, action) => {
  
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

    switch(action.type) {
  
      /**
       * We enter / leave the adding more
       */
      case source.updateIsAdding:
    
        return {
          ...sceneState,
          addingSearch: null,
          isAdding: !sceneState.isAdding
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
  main,
  content,
  addingContent,
  header,
});