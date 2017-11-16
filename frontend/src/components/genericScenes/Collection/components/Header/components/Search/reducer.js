import { layout } from 'services/titles/interface'
import { search } from 'services/titles/data'

const defaultState = {
  query: ''
};

const searchReducer = (state = defaultState, action) => {
  switch(action.type) {
  
    case search.update_query:
      return {
        ...state,
        query: action.query
      };
  
    case layout.update:
      return {
        ...state,
        query: ''
      };
      
    default:
      return state;
  }
  
};

export default searchReducer;