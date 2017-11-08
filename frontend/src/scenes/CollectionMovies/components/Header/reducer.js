import { movieCollections } from 'services/actions/titles/api'

import { combineReducers } from 'redux'

import search from './components/Search/reducer'

const defaultState = {
  collection: undefined,
  title: ''
};

const main = (state = defaultState, action) => {
  switch(action.type) {
    
    case movieCollections.load + '_FULFILLED':
      if(!action.payload) {
        return state;
      }
      return {
        ...state,
        collection: action.payload.pk,
        title: action.payload.title
      };
    
    default:
      return state;
  }
  
};

const reducer = combineReducers({
  main,
  search
});


export default reducer;