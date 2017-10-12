import { combineReducers } from 'redux'

import dialogAddMovie from './components/DialogAddMovie/reducer'

const main = (state = {}, action) => {

    switch(action.type) {
      default:
        return state;
    }


};

const reducer = combineReducers({
  main,
  dialogAddMovie
});


export default reducer;