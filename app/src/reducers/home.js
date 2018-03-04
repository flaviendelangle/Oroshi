import { combineReducers } from 'redux'

import collectionList from '../scenes/Home/CollectionList/reducer'
import dialogCreateCollection from '../scenes/Home/DialogCreateCollection/reducer'

import { collectionContent } from '../services/titles/api'
import { getElementClass } from '../services/content/collectionTypes'

const defaultState = {
  collections: [],
  isLoaded: false,
}

const main = (state = defaultState, action) => {
  switch (action.type) {
    case `${collectionContent.loadAllSettings}_FULFILLED`:
      return {
        ...state,
        collections: action.payload.map(collection => (
          getElementClass(collection.type).fromSettings(collection)
        )),
        isLoaded: true,
      }
    case `${collectionContent.create}_FULFILLED`:
      return {
        ...state,
        collections: [...state.collections, action.payload],
      }
    default:
      return state
  }
}

const reducer = combineReducers({
  main,
  collectionList,
  dialogCreateCollection,
})


export default reducer
