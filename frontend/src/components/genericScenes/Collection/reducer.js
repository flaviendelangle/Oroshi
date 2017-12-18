import { combineReducers } from 'redux';

import header from './components/Header/reducer';
import content from './components/CollectionContent/reducer';
import addingContent from './components/AddingContent/reducer';

import { source, snacks } from 'services/titles/interface';
import { collections } from "services/titles/api";


const defaultState = {};

const defaultElementState = {
  isAdding: false,
  messages: []
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
  
      /**
       * We enter / leave the adding more
       */
      case source.updateIsAdding:
    
        return {
          ...sceneState,
          addingSearch: null,
          isAdding: !sceneState.isAdding
        };
  
      /**
       * An element has been updated in the collection (ex : Not Seen => Seen)
       */
      case collections.update + '_FULFILLED':
        if(action.meta.type !== 'seen') {
          return sceneState;
        }
        const title = action.payload.getTitle();
        const seen = (action.payload.hasBeenSeen() ? '' : 'not ') + 'seen';
        const newMessage = {
          content: title + ' marked as ' + seen
        };
        return {
          ...sceneState,
          messages: [...sceneState.messages, newMessage]
        };
  
      /**
       * A snack must be removed
       */
      case snacks.remove:
        return {
          ...sceneState,
          messages: sceneState.messages.slice(1)
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