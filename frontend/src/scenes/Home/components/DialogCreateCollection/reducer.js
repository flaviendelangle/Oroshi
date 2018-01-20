import { combineReducers } from 'redux'

import { dialogs } from 'services/titles/interface'
import { collectionContent } from "services/titles/api";


const defaultState = {
  show: false,
  collections: [],
};

const main = (state = defaultState, action) => {
  switch (action.type) {
    case dialogs.createCollection: {
      return {
        ...state,
        show: action.show,
      };
    }

    case `${collectionContent.create}_FULFILLED`: {
      return {
        ...state,
        show: false,
      };
    }

    default:
      return state;
  }
};

const reducer = combineReducers({
  main,
});


export default reducer;
