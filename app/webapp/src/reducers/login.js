import { combineReducers } from 'redux'


const defaultState = {
}

const main = (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

const reducer = combineReducers({
  main,
})


export default reducer
