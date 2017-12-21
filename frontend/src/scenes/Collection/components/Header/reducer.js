import { collectionContent } from 'services/titles/api';
import { layout } from 'services/titles/interface'
import { search } from 'services/titles/data'

const defaultState = {};

const defaultElementState = {
  title: '',
  query: ''
};

const reducer = (state = defaultState, action) => {
  
  if (!action.meta || !action.meta.scene) {
    return state;
  }
  const scene = action.meta.scene;
  
  if (!state[scene]) {
    state = {
      ...state,
      [scene]: defaultElementState
    };
  }
  
  const sceneReducer = sceneState => {
    
    switch(action.type) {
  
      case collectionContent.load + '_FULFILLED':
        if (!action.payload) {
          return sceneState;
        }
        return {
          ...sceneState,
          title: action.payload.title
        };
      
      case search.update_query:
        return {
          ...sceneState,
          query: action.query
        };
  
      case layout.update:
        return {
          ...sceneState,
          query: ''
        };
  
  
      default:
        return sceneState;
    }
    
  };
  
  return {
    ...state,
    [scene]: sceneReducer(state[scene])
  };
  
};



export default reducer;