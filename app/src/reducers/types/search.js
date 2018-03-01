import { search } from '../../services/titles/data'

const defaultState = {
  matches: [],
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case search.compute_advanced_search: {
      return {
        ...state,
        matches: action.payload,
      }
    }

    default:
      return state
  }
}


export default reducer
