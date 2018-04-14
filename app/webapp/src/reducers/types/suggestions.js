import { collectionContent } from '../../services/titles/api'
import { elementSuggestions as titles } from '../../services/titles/interface'


const defaultState = {
  suggestions: {
    results: [],
  },
  suggestionsLoaded: false,
}

const elementSuggestions = (state = defaultState, action) => {
  switch (action.type) {
    case `${collectionContent.loadSuggestions}_FULFILLED`: {
      return {
        ...state,
        suggestions: action.payload,
        suggestionsLoaded: true,
      }
    }

    case titles.clean: {
      return defaultState
    }

    default:
      return state
  }
}

export default elementSuggestions
