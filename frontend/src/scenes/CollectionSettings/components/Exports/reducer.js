import { movieCollections } from 'services/actions/titles/api'

const defaultState = {
  collection: undefined
};

const exportsReducer = (state = defaultState, action) => {
  switch(action.type) {
    
    case movieCollections.loadSettings + '_FULFILLED':
      if(!action.payload) {
        return state;
      }
      return {
        ...state,
        collection: action.payload.pk
      };
    
    default:
      return state;
  }
  
};

export default exportsReducer;