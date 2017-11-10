import { collections } from 'services/titles/api'
import { dialogs } from 'services/titles/interface'
import { request } from 'services/titles/publicAPI'

const defaultState = {
  data: {
    results: []
  }
};

const reducer = (state = defaultState, action) => {
  
  switch(action.type) {
    
    case request.search + '_FULFILLED':
      return {
        ...state,
        data: action.payload
      };
  
    case dialogs.addElement:
      if(dialogs.show) {
        return state;
      }
      return {
        ...state,
        data: {
          results: []
        }
      };
      
    case collections.add + '_FULFILLED':
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

export default reducer;