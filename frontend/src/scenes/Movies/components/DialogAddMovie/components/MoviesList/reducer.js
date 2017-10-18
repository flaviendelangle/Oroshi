import { combineReducers } from 'redux'

import saveButton from './components/SaveButton/reducer'

const defaultState = {
  data: {
    results: []
  }
};

const main = (state = defaultState, action) => {
  
  switch(action.type) {
    case 'SEARCH_MOVIE_TMDB_FULFILLED':
      return {
        ...state,
        data: action.payload
      };
    case 'ADD_MOVIE_TO_COLLECTION_FULFILLED':
      const newResults = state.data.results.map((element) => {
        if(element.id === action.payload.tmdbId) {
          element.already_in_collection = true;
        }
        return element;
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