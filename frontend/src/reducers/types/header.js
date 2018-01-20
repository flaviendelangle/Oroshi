import { notify } from "services/titles/router";
import { drawers } from "services/titles/interface";


const defaultState = {
  isDrawerOpen: false,
};

const header = (state = defaultState, action) => {
  
  switch (action.type) {
    
    case notify.change:
      return {
        ...state,
        isDrawerOpen: false
      };
  
    case drawers.main :
      return {
        ...state,
        isDrawerOpen: action.show
      };
      
    default:
      return state;
  }
};


export default header;