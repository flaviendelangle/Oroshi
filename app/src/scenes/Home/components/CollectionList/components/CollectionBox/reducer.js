import { combineReducers } from 'redux'

import { dialogs } from 'services/titles/interface'

const defaultState = {
}

const main = (state = defaultState, action) => {
  switch (action.type) {
    case dialogs.addMovie:
      return {
        ...state,
        isAddingAMovie: action.show,
      }
    default:
      return state
  }
}

const reducer = combineReducers({
  main,
})

export default reducer
