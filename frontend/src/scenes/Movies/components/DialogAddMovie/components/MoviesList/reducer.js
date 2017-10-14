import { combineReducers } from 'redux'

import saveButton from './components/SaveButton/reducer'

const defaultState = {
  data: {
    results: []
  }
};

const main = (state = defaultState, action) => {
  
  switch(action.type) {
    case 'UPDATE_AUTO_COMPLETE_DIALOG_ADD_MOVIE':
      return {
        ...state,
        data: action.data
      };
    default:
      return state;
  }
  
};

const reducer = combineReducers({
  main,
  saveButton
});


export default reducer;