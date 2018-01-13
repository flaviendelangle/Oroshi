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
    
    let title, newMessage;

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
        const seen = (action.payload.hasBeenSeen() ? '' : 'not ') + 'seen';
        title = action.payload.getTitle();
        newMessage = {
          content: title + ' marked as ' + seen
        };
        return {
          ...sceneState,
          messages: [...sceneState.messages, newMessage]
        };
  
      /**
       * An element has been added to the collection
       */
      case collections.add + '_FULFILLED':
        title = action.payload.getTitle();
        newMessage = {
          content: title + ' added to your collection'
        };
        return {
          ...sceneState,
          messages: [...sceneState.messages, newMessage]
        };
  
      /**
       * An element has been removed from the collection
       */
      case collections.remove + '_FULFILLED':
        title = action.payload.getTitle();
        newMessage = {
          content: title + ' removed from your collection'
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