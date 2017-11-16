import { collectionContent, collections } from 'services/titles/api'

const defaultState = {
  contentToImport: null,
  created: {},
  keysNumber: 0,
  elementNumber: 0,
  progress: 0
};


const contentImporterReducer = (state = defaultState, action) => {
  
  switch(action.type) {
    
    case collectionContent.create + '_FULFILLED':
      if(!action.payload.importContent) {
        return state;
      }
      const data = action.payload.elements;
      return {
        ...state,
        contentToImport: data,
        elementNumber: data.length
      };
    
    case collections.add:
      const keysNumber = state.keysNumber + 1;
      let progress = 0;
      if(state.elementNumber > 0) {
        progress = keysNumber / state.elementNumber * 100;
      }
      return state;
      return {
        ...state,
        created: {
          ...state.created,
          [action.data.tmdbId]: action.data
        },
        keysNumber,
        progress
      };
      
    default:
      return state;
  }
  
};

export default contentImporterReducer;