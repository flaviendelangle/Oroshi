import { combineReducers } from 'redux'

import collectionList from './components/CollectionList/reducer'
import dialogCreateCollection from './components/DialogCreateCollection/reducer'

const defaultState = {
  collections: [],
  loaded: false
};

const main = (state = defaultState, action) => {
  switch(action.type) {
    case 'LOAD_COLLECTIONS_FULFILLED':
      return {
        ...state,
        collections: action.payload,
        loaded: true
      };
    case 'CREATE_NEW_COLLECTION_FULFILLED':
      return {
        ...state,
        collections: state.collections.concat([action.payload])
      };
    default:
      return state;
  }
};

const reducer = combineReducers({
  main,
  collectionList,
  dialogCreateCollection
});


export default reducer;