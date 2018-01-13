import { collectionContent } from "services/titles/api";


const defaultState = {
  loaded: false,
  suggestions: {
    results: []
  }
};

const elementSuggestions = (state = defaultState, action) => {
  
  switch(action.type) {
    
    case collectionContent.loadSettings + '_FULFILLED':
      return {
        ...state,
        loaded: true,
        collection: action.payload
      };
    
    case collectionContent.loadSuggestions + '_FULFILLED':
      return {
        ...state,
        suggestions: action.payload
      };
    
    default:
      return state;
  }
  
};

export default elementSuggestions;