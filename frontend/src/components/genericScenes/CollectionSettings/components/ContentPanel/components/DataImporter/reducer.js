import { collectionContent, collections } from 'services/titles/api'

const defaultState = {
  created: {},
  keysNumber: 0,
  elementNumber: 0,
  progress: 0,
  importFromFile: null,
  error: null
};

const reducer = (scene, state = defaultState, action) => {
  
  if (action.meta && action.meta.scene && action.meta.scene !== scene) {
    return state;
  }
  
  switch(action.type) {
  
    case collectionContent.importFromFile + '_FULFILLED':
      if (action.payload.error) {
        return {
          ...state,
          error: action.payload.error
        };
      }
      return {
        ...state,
        error: null,
        importFromFile: action.payload,
      };

    case collectionContent.import + '_STARTED':
      return {
        ...state,
        elementNumber: action.data.length
      };
      
    case collections.add:
      const keysNumber = state.keysNumber + 1;
      let progress = 0;
      if (state.elementNumber > 0) {
        progress = keysNumber / state.elementNumber * 100;
      }
      return {
        ...state,
        created: {
          ...state.created,
          [action.payload.tmdbId]: action.payload
        },
        keysNumber,
        progress
      };

    
    default:
      return state;
  }
  
};

export default reducer;


