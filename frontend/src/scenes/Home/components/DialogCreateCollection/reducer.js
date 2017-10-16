import { combineReducers } from 'redux'

const defaultState = {
  isAddingACollection: false
};

const main = (state = defaultState, action) => {
  
  switch(action.type) {
    case 'SHOW_DIALOG_CREATE_COLLECTION':
      return {
        ...state,
        isAddingACollection: action.show
      };
    default:
      return state;
  }
  
};

const reducer = combineReducers({
  main,
});


export default reducer;