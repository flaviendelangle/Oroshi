import { source, snacks } from 'services/titles/interface'
import { collections, collectionContent } from "services/titles/api"
import TMDBAPI from 'services/TheMovieDatabaseJS/index'


const defaultState = {
  isAdding: false,
  messages: [],
  found: false,
  isLoaded: false,
  collection: null,
}

const main = (state = defaultState, action) => {
  switch (action.type) {
    /**
     * The collection has been loaded (with the content !)
     */
    case `${collectionContent.load}_FULFILLED`: {
      if (!action.payload) {
        return {
          ...state,
          found: false,
          isLoaded: true,
        }
      }
      const { content, ...collection } = action.payload
      TMDBAPI.setConfig({
        include_adult: action.payload.adult_content,
        language: action.payload.title_language,
      })
      return {
        ...state,
        collection,
        found: true,
        isLoaded: true,
      }
    }

    /**
     * The collection has been loaded (without the content !)
     */
    case `${collectionContent.loadSettings}_FULFILLED`: {
      return {
        ...state,
        collection: action.payload,
        found: true,
        isLoaded: true,
      }
    }

    /**
     * We enter / leave the adding more
     */
    case source.updateIsAdding: {
      return {
        ...state,
        addingSearch: null,
        isAdding: !state.isAdding,
      }
    }

    /**
     * An element has been updated in the collection (ex : Not (Seen) => Seen)
     */
    case `${collections.update}_FULFILLED`: {
      if (action.meta.field !== 'seen') {
        return state
      }
      const seen = `${action.payload.hasBeenSeen() ? '' : 'not '}seen`
      const title = action.payload.getTitle()
      const newMessage = {
        content: `${title} marked as ${seen}`,
      }
      return {
        ...state,
        messages: [...state.messages, newMessage],
      }
    }

    /**
     * An element has been added to the collection
     */
    case `${collections.add}_FULFILLED`: {
      const title = action.payload.getTitle()
      const newMessage = {
        content: `${title} added to your collection`,
      }
      return {
        ...state,
        messages: [...state.messages, newMessage],
      }
    }

    /**
     * An element has been removed from the collection
     */
    case `${collections.remove}_FULFILLED`: {
      const title = action.payload.getTitle()
      const newMessage = {
        content: `${title} removed from your collection`,
      }
      return {
        ...state,
        messages: [...state.messages, newMessage],
      }
    }

    /**
     * A snack must be removed
     */
    case snacks.remove: {
      return {
        ...state,
        messages: state.messages.slice(1),
      }
    }

    default:
      return state
  }
}


export default main
