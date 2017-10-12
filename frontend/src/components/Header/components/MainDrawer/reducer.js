const defaultState = {
  isOpen: false
};

const mainDrawerReducer = (state = defaultState, action) => {
  
  switch(action.type) {
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