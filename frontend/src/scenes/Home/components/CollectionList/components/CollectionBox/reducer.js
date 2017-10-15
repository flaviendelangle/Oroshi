import { combineReducers } from 'redux'

const defaultState = {
};

const main = (state = defaultState, action) => {
  
  switch(action.type) {
    case 'SHOW_DIALOG_ADD_MOVIE':
      return {
        ...state,
        isAddingAMovie: action.show
      };
    default:
      return state;
  }
  
};

const reducer = combineReducers({
  main
});


export default reducer;