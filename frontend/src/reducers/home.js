import { combineReducers } from 'redux'

import collectionList from '../scenes/Home/components/CollectionList/reducer'
import dialogCreateCollection from '../scenes/Home/components/DialogCreateCollection/reducer'

import { collectionContent } from 'services/titles/api'

const defaultState = {
  collections: [],
  loaded: false
};

const main = (state = defaultState, action) => {
  switch(action.type) {
    case collectionContent.loadAllSettings + '_FULFILLED':
      return {
        ...state,
        collections: action.payload,
        loaded: true
      };
    case collectionContent.create + '_FULFILLED':
      return {
        ...state,
        collections: [ ...state.collections, action.payload ]
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