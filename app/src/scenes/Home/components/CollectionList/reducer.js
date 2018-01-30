import { combineReducers } from 'redux'

import collectionBox from './components/CollectionBox/reducer'

const defaultState = {
};

const main = (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const reducer = combineReducers({
  main,
  collectionBox,
});

export default reducer;
