import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import header from '../components/Header/reducer'

import movies from '../scenes/Movies/reducer'

const reducer = combineReducers({
  // External modules
  form,
  
  // Generics
  header,
  
  // Scenes
  movies
});


export default reducer;