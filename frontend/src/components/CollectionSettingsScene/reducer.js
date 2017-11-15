import { combineReducers } from 'redux'

import exports from './components/Exports/reducer'
import header from './components/Header/reducer'

const reducerBuilder = _scene => {
  
  const defaultState = {
  };
  
  
  const main = (scene, state = defaultState, action) => {
    
    if(action.meta && action.meta.scene && action.meta.scene !== scene) {
      return state;
    }
    
    switch(action.type) {
      
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
