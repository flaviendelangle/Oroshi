import { combineReducers } from 'redux'

import collectionList from './components/CollectionList/reducer'


const main = (state = {}, action) => {
  switch(action.type) {
    default:
      return state;
  }
};

const reducer = combineReducers({
  main,
  collectionList
});


export default reducer;