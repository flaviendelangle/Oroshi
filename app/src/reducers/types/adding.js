import { collectionContent, collections } from 'services/titles/api'
import * as publicAPI from 'services/titles/publicAPI'

import * as adding_search_manager from '../../scenes/Collection/components/AddingContent/services/adding_search_manager'
import * as recommendations_manager from '../../scenes/Collection/components/AddingContent/services/recommendations_manager'
import { source } from "../../services/titles/interface"


const defaultState = {
  collection: null,
  recommendations: {
    results: [],
  },
  addingSearch: null,
  isLoaded: false,
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    /**
     * We enter / leave the adding more
     */
    case source.updateIsAdding: {
      return {
        ...state,
        addingSearch: null,
      }
    }

    /**
     * The collection has been loaded
     */
    case `${collectionContent.load}_FULFILLED`: {
      return {
        ...state,
        collection: action.payload,
      }
    }

    /**
     * An component has been added to the collection
     */
    case `${collections.add}_FULFILLED`: {
      const newState = adding_search_manager.add(state, action.payload)
      return recommendations_manager.add(newState, action.payload)
    }

    /**
     * An component has been removed from the collection
     */
    case `${collections.remove}_FULFILLED`: {
      const newElement = action.payload
      const newState = adding_search_manager.remove(state, newElement)
      return recommendations_manager.remove(newState, newElement)
    }

    /**
     * The recommendations for the adding mode (i.e Top Rated + Popular) has been loaded
     */
    case `${publicAPI.request.get_recommendations}_FULFILLED`: {
      return {
        ...state,
        addingSearch: null,
        recommendations: action.payload,
        isLoaded: true,
      }
    }

    /**
     * A new page of the popular movies has been loaded
     */
    case `${publicAPI.request.get_popular}_FULFILLED`: {
      return recommendations_manager.merge(
        state,
        action.payload,
        'popular',
      )
    }

    /**
     * A new page of the top rated movies has been loaded
     */
    case `${publicAPI.request.get_top_rated}_FULFILLED`: {
      return recommendations_manager.merge(
        state,
        action.payload,
        'top_rated',
      )
    }

    /**
     * A search to the public API has been completed (used only in Adding Mode)
     */
    case `${publicAPI.request.search}_FULFILLED`: {
      return {
        ...state,
        addingSearch: adding_search_manager.merge(state, action.payload),
      }
    }

    default:
      return state
  }
}


export default reducer
