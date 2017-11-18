import { combineReducers } from 'redux';

import header from './components/Header/reducer';
import dataImporter from './components/ContentPanel/components/DataImporter/reducer';
import { collectionSettings } from 'services/titles/interface';
import { collectionContent, collections } from 'services/titles/api';

const reducerBuilder = _scene => {
  
  const defaultState = {
    activeSection: 'summary',
    data: {},
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
          title: action.payload.title,
          data: action.payload
        };
        
      case collections.updateSettings + '_FULFILLED':
        return {
          ...state,
          data: action.payload
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
    header,
    dataImporter: dataImporter.bind(this, _scene)
  });
  
};

export default reducerBuilder;
