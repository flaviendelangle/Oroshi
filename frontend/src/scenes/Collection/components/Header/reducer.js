import { collectionContent } from 'services/titles/api';
import { layout } from 'services/titles/interface'
import { search } from 'services/titles/data'


const defaultState = {
  title: '',
  query: ''
};

const reducer = (state = defaultState, action) => {
  
  switch(action.type) {
    
    case collectionContent.load + '_FULFILLED':
      if (!action.payload) {
        return state;
      }
      return {
        ...state,
        title: action.payload.title
      };
    
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



export default reducer;