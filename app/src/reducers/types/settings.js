import { collectionSettings } from '../../services/titles/interface'
import { collectionContent, collections } from '../../services/titles/api'


const defaultState = {
  activeSection: 'summary',
  data: null,
  redirect: null,
  dataImporter: {
    created: {},
    keysNumber: 0,
    elementNumber: 0,
    progress: 0,
    importFromFile: null,
    error: null,
  },
}

const settings = (state = defaultState, action) => {
  switch (action.type) {
    case `${collectionContent.loadSettings}_FULFILLED`: {
      if (!action.payload) {
        return state
      }
      return {
        ...state,
        title: action.payload.title,
        data: action.payload,
      }
    }

    case `${collections.updateSettings}_FULFILLED`: {
      return {
        ...state,
        data: action.payload,
      }
    }

    case `${collections.destroy}_FULFILLED`: {
      return {
        ...state,
        redirect: '/',
      }
    }

    case collectionSettings.switchSection: {
      return {
        ...state,
        activeSection: action.value,
      }
    }

    case `${collectionContent.importFromFile}_FULFILLED`:
      if (action.payload.error) {
        return {
          ...state,
          dataImporter: {
            ...state.dataImporter,
            error: action.payload.error,
          },
        }
      }
      return {
        ...state,
        dataImporter: {
          ...state.dataImporter,
          error: null,
          importFromFile: action.payload,
        },
      }

    case `${collectionContent.import}_FULFILLED`:
      return {
        ...state,
        dataImporter: {
          ...state.dataImporter,
          elementNumber: action.data.length,
        },
      }

    case collections.add: {
      const keysNumber = state.keysNumber + 1
      const element = action.payload
      let progress = 0
      if (state.elementNumber > 0) {
        progress = (keysNumber / state.elementNumber) * 100
      }
      return {
        ...state,
        dataImporter: {
          ...state.dataImporter,
          created: {
            ...state.dataImporter.created,
            [element.getPublicId()]: element,
          },
          keysNumber,
          progress,
        },
      }
    }

    default:
      return state
  }
}

export default settings
