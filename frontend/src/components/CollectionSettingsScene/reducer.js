import { combineReducers } from 'redux';

import header from './components/Header/reducer';
import { collectionSettings } from '../../services/titles/interface';
import { collectionContent } from '../../services/titles/api';

const reducerBuilder = _scene => {
  
  const defaultState = {
    activeSection: 'summary',
    collection: undefined,
    title: ''
  };
  
  const main = (scene, state = defaultState, action) => {
    
    if(action.meta && action.meta.scene && action.meta.scene !== scene) {
      return state;
    }
    
    switch(action.type) {
  
      case collectionContent.loadSettings + '_FULFILLED':
        if(!action.payload) {
          return state;
        }
        return {
          ...state,
          collection: action.payload.pk,
          title: action.payload.title
        };
  
      case collectionSettings.switchSection:
        return {
          ...state,
          activeSection: action.value
        };
      
      default:
        return state;
    }
    
  };
  
  return combineReducers({
    main: main.bind(this, _scene),
    header
  });
  
};

export default reducerBuilder;
