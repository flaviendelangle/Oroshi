import { notify } from '../../../../services/actions/titles/router'

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
    
    case 'SHOW_MAIN_DRAWER' :
      return {
        ...state,
        isOpen: action.show
      };
      
    case 'UPDATE_LOCATION' :
      return {
        ...state,
        isOpen: false
      };
    default:
      return state;
  }
  
};

export default mainDrawerReducer;