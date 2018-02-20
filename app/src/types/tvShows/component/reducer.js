import { request } from '../../../services/titles/publicAPI'


const defaultState = {}

const defaultElementState = {
  seasons: {},
  details: null,
}

const reducer = (_state = defaultState, action) => {
  if (!action.meta || !action.meta.tv_shows_id) {
    return _state
  }
  const id = action.meta.tv_shows_id

  let state = { ..._state }
  if (!state[id]) {
    state = {
      ...state,
      [id]: defaultElementState,
    }
  }

  const elementReducer = (elementState) => {
    switch (action.type) {
      case `${request.get_details}_FULFILLED`: {
        return {
          ...elementState,
          details: action.payload,
        }
      }

      case `${request.get_season_details}_PENDING`: {
        return {
          ...elementState,
          seasons: {
            ...elementState.seasons,
            [action.meta.season]: null,
          },
        }
      }

      case `${request.get_season_details}_FULFILLED`: {
        return {
          ...elementState,
          seasons: {
            ...elementState.seasons,
            [action.meta.season]: action.payload,
          },
        }
      }

      default:
        return elementState
    }
  }

  return {
    ...state,
    [id]: elementReducer(state[id]),
  }
}

export default reducer
