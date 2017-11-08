import { combineReducers } from 'redux'

import saveButton from './components/SaveButton/reducer'
import { collectionsMovies } from 'services/actions/titles/api'
import { dialogs } from 'services/actions/titles/interface'
import { search } from 'services/actions/titles/tmdb'

const defaultState = {
  data: {
    results: []
  }
};

const main = (state = defaultState, action) => {
  
  switch(action.type) {
    
    case search.movies + '_FULFILLED':
      return {
        ...state,
        data: action.payload
      };
  
    case dialogs.addMovie:
      if(dialogs.show) {
        return state;
      }
      return {
        ...state,
        data: {
          results: []
        }
      };
      
    case collectionsMovies.add + '_FULFILLED':
      const newResults = state.data.results.map(el => {
        if(el.id === action.payload.tmdbId) {
          el.already_in_collection = true;
        }
        return el;
      });
      return {
        ...state,
        data: {
          ...state.data,
          results: newResults
        }
      };
      
    default:
      return state;
  }
  
};

const reducer = combineReducers({
  main,
  saveButton
});


export default reducer;