import { combineReducers } from 'redux'

import collectionList from './components/CollectionList/reducer'
import dialogCreateCollection from './components/DialogCreateCollection/reducer'

import { movieCollections } from 'services/actions/titles/api'

const defaultState = {
  collections: [],
  loaded: false
};

const main = (state = defaultState, action) => {
  switch(action.type) {
    case movieCollections.loadAllSettings + '_FULFILLED':
      return {
        ...state,
        collections: action.payload,
        loaded: true
      };
    case movieCollections.create + '_FULFILLED':
      return {
        ...state,
        collections: state.collections.concat([action.payload.collection])
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