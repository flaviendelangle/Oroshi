import { combineReducers } from 'redux'

import collectionList from '../scenes/Home/components/CollectionList/reducer'
import dialogCreateCollection from '../scenes/Home/components/DialogCreateCollection/reducer'

import { collectionContent } from 'services/titles/api'
import { getActions } from "services/content/collectionTypes"

const defaultState = {
  collections: [],
  isLoaded: false,
}

const main = (state = defaultState, action) => {
  switch (action.type) {
    case `${collectionContent.loadAllSettings}_FULFILLED`:
      return {
        ...state,
        collections: action.payload.map(({ cover_elements, ...collection }) => {
          const elements = cover_elements.map(el => ({
            local: el,
            distant: null
          }))
          return {
            ...collection,
            cover_elements: getActions(collection.type)
              .elementClass
              .fromDistantList(elements, collection),
          }
        }),
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
