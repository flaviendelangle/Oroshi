import { notify } from 'services/titles/router'
import { drawers } from 'services/titles/interface'

const defaultState = {
  isOpen: false
};

const mainDrawerReducer = (state = defaultState, action) => {
  
  switch(action.type) {
    
    case notify.change:
      return {
        ...state,
        isOpen: false
      };
    
    case drawers.main :
      return {
        ...state,
        isOpen: action.show
      };
    
    default:
      return state;
  }
  
};

export default mainDrawerReducer;