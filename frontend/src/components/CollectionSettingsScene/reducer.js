import { combineReducers } from 'redux';

import exports from './components/ContentPanel/components/ExportParameters/reducer';
import header from './components/Header/reducer';
import { collectionSettings } from '../../services/titles/interface';

const reducerBuilder = _scene => {
  
  const defaultState = {
    activeSection: 'summary'
  };
  
  const main = (scene, state = defaultState, action) => {
    
    if(action.meta && action.meta.scene && action.meta.scene !== scene) {
      return state;
    }
    
    switch(action.type) {
      
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
    exports,
    header
  });
  
};

export default reducerBuilder;
