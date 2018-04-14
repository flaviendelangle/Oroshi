import { collectionContent } from '../services/titles/api'
import { dialogs } from '../services/titles/interface'
import { getElementClass } from '../services/content/collectionTypes'


const defaultState = {
  collections: [],
  isLoaded: false,
  isCreating: false,
}

const main = (state = defaultState, action) => {
  switch (action.type) {
    case `${collectionContent.loadAllSettings}_FULFILLED`: {
      return {
        ...state,
        collections: action.payload.map(collection => (
          getElementClass(collection.type).fromSettings(collection)
        )),
        isLoaded: true,
      }
    }

    case `${collectionContent.create}_FULFILLED`: {
      return {
        ...state,
        collections: [...state.collections, action.payload],
        isCreating: false,
      }
    }

    case dialogs.createCollection: {
      return {
        ...state,
        isCreating: action.show,
      }
    }

    default:
      return state
  }
}

export default main
