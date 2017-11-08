import { movies } from 'services/actions/titles/data'

const defaultState = {
  query: ''
};

const searchReducer = (state = defaultState, action) => {
  switch(action.type) {
  
    case movies.update_search_query:
      return {
        ...state,
        query: action.query
      };
  
    case movies.update_layout:
      return {
        ...state,
        query: ''
      };
      
    default:
      return state;
  }
  
};

export default searchReducer;